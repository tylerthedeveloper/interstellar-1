// express stuff
const express = require('express')
const app = express()
const pathFinderPort = require('./ms-ports').pathFinderPort;
const bodyParser = require('body-parser');

const StellarSdk = require('stellar-sdk'); 
const server = new StellarSdk.Server('https://horizon.stellar.org');
const stellarAssetDict = require('../data/stellar-asset-dict')

// just for testing other than siteKey
const _keys = require('../data/_keys')
const sitePubKey = _keys.siteKey.pubKey;

// mocking the redis cache
const TEMP_pathsDict = require('./temp-paths-cache')

// Cheapest = lowest source_amount
// -------------------------------------------------------------------- //
// desc: finds the first path given the necessary inputs
// inputs: sender: string, receiver: string, sendAsset: Asset, destAsset: Asset, destAmount: string | num, 
// returns: PathPaymentResult | transactionResult
// -------------------------------------------------------------------- //
const exchangeAndPathTupler = (pathFoundResult) => {
    const { destination_amount, source_amount, path } = pathFoundResult;
    const exchangeRate = calcExchangeRate(destination_amount, source_amount);
    return { 
        "exchangeRate": exchangeRate, 
        "path": path 
    };
}

const findCheapestPath = (sender, receiver, sendAsset, currentBalance, destAsset, destAmount) => {
    return server.paths(sender, receiver, destAsset, destAmount)
        .call()
        .then(paths => JSON.parse(JSON.stringify(paths)).records)
        .catch(err => console.log(err))
        .then(paths => {
            const { code, issuer } = sendAsset;
            let pathList;
            if (issuer) pathList = paths.filter(path => (path.source_asset_code === code && path.source_asset_issuer === issuer))
            else pathList = paths.filter(path => (path.source_asset_type === 'native'))
            const cheapestPath = pathList.reduce((prev, curr) => (prev.source_amount < curr.source_amount ? prev : curr), []);
            const triple = exchangeAndPathTupler(cheapestPath);
            // console.log(triple);
            if (cheapestPath) return triple;
            throw Error('err: No suitable path exists between the corresponding assets')
        })
        .catch(err => console.error(err))
        // .catch(err => console.error(JSON.stringify(err.response.data.extras.result_codes)))
}



// Cheapest = lowest source_amount
// -------------------------------------------------------------------- //
// desc: finds the cheapest path for each balance given the necessary inputs
// inputs: sender: string, receiver: string, sendAsset: Asset, destAsset: Asset, destAmount: string | num, 
// returns: Dict < PathPaymentResult > 
// -------------------------------------------------------------------- //
// helper method for  below
const codeIssueAssetPair = (asset) => {
    const { code, issuer } = asset;
    if (code === 'XLM' && issuer === undefined ) return 'XLM';
    else return (`${code}-${issuer}`);
}

const codeIssueKeyPair = (pathFoundResult) => {
    const { source_asset_code, source_asset_issuer, source_asset_type } = pathFoundResult;
    if (source_asset_type === 'native') return 'XLM'; 
    else return (`${source_asset_code}-${source_asset_issuer}`);
}

const calcExchangeRate = (destination_amount, source_amount) => {
    return (destination_amount / source_amount);
}

// TODO: Should this be changed to site sender to get all assets ???
const findCheapestPaths = (sender, receiver, destAsset, destAmount) => {
    return server.paths(sender, receiver, destAsset, destAmount)
        .call()
        .then(paths => JSON.parse(JSON.stringify(paths)).records)
        .catch(err => console.log(err))
        .then(paths => {
            const pathDict = {}
            const destKey = codeIssueAssetPair(destAsset);
            const destInDict = {};
            pathDict[destKey] = destInDict;
            paths.forEach(pathResult => {
                const key = codeIssueKeyPair(pathResult);
                if (!destInDict[key]) {
                    destInDict[key] = exchangeAndPathTupler(pathResult);
                } else {
                    const { source_amount } = pathResult;
                    const dict_source_amount = destInDict[key][0];
                    // console.log(source_amount, dict_source_amount);
                    if (source_amount < dict_source_amount) {
                        destInDict[key] = exchangeAndPathTupler(pathResult);
                    }
                }
            });
            if (pathDict) return pathDict;
            throw Error('err: No path exists between the corresponding assets')
        })
        .catch(err => console.error(err))
        // .catch(err => console.error(JSON.stringify(err.response.data.extras.result_codes)))
}

////////////////////////
// TODO: NEED TO VERIFY ADDED TO CACHE: FILLCACHE(PATH) !!!!!
///////////////////////

// checks to see if there exists a path in the cache from a->b that is at or below the destination amount
const pathLookUp = (sender, receiver, fromAsset, currentBalance, toAsset, destAmount) => {
    const fromAssetLookup = TEMP_pathsDict[toAsset.getCode()];
    if (!fromAssetLookup) {
        return findCheapestPath(sender, receiver, fromAsset, currentBalance, toAsset, destAmount)
            .then(foundPath => {
                fillCache(foundPath);
                return foundPath;
            });
    } else {
        const toAssetLookup = fromAssetLookup[toAsset.getCode()];
        if (toAssetLookup && toAssetLookup.destinationAmount >= destAmount) {
            return toAssetLookup;
        }
        else {
            return findCheapestPath(sender, receiver, fromAsset, currentBalance, toAsset, destAmount)
                .then(foundPath => {
                    fillCache(foundPath);
                    return foundPath;
                });
        }
    }
}

// ────────────────────────────────────────────────────────────────────────────────
////////////////////////
// TODO: NEED TO USE THIS ABOVE!!!!!
///////////////////////
// ────────────────────────────────────────────────────────────────────────────────
// this will handle the return result of getting a new path and fill the cache accordingly
function fillCache(newPath) {
    // fill redis cache with dict
    // this.cache.add(newPath);
    // console.log('added to dict');
    return Promise.resolve(true);
}


// TODO: make sure the source amount is <= source_amount
// this iterates over balances and the asset-totals to return the paths 
// from all balances to all owed assets
const lookupAllPaths = (pubKey, balances, assetDict) => {
    const promises = [];
    balances.map(balance => {
        const { 
            asset_type: fromAssetType,
            asset_code: fromAssetCode, 
            asset_issuer: fromAssetIssuer,
            balance: fromAssetBalance
        } = balance;
        let fromAsset;
        if (new String(fromAssetType).valueOf() === 'native') fromAsset = new StellarSdk.Asset.native();
        else fromAsset = new StellarSdk.Asset(fromAssetCode, fromAssetIssuer);
        Object.keys(assetDict).map(key => {
            const toAsset = new StellarSdk.Asset(key, assetDict[key].issuer);
            const promise = pathLookUp(pubKey, sitePubKey, fromAsset, fromAssetBalance, toAsset, assetDict[key].total);
            promises.push(promise);
        });
    });
    return Promise.all(promises);
}

//      //
// test //
//      //
// const stellarAssetDict = require('../data/stellar-asset-dict')
findCheapestPath(_keys.firstKey.pubKey, _keys.thirdKey.pubKey, stellarAssetDict.REPO, .2, stellarAssetDict.MOBI, .05)
    .then(res => console.log(res))

// pathLookUp(_keys.firstKey.pubKey, stellarAssetDict.REPO, 10, stellarAssetDict.MOBI, .1)
//     .then(res => console.log(res))

// pathLookUp(_keys.firstKey.pubKey, _keys.secondKey.pubKey, stellarAssetDict.REPO, 10, stellarAssetDict.CNY, 1)
//     .then(res => console.log(res))


const assetDictTotals = 
{ 
    "CNY":
    { 
        "total": 0.0344187,
        "issuer": "GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX" 
    },
    "MOBI":
    { 
        "total": 0.087848,
        "issuer": "GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH" 
    } 
};

const balances = [ { "balance": "0.2373078",
    "limit": "922337203685.4775807",
    "asset_type": "credit_alphanum4",
    "asset_code": "REPO",
    "asset_issuer": "GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B" },
  { "balance": "3.8393040", "asset_type": "native" } 
]

app.use(bodyParser.json());

app.post('/cheapestPath/:pubkey', function (req, res) {
    const pubkey = req.params.pubkey;
    const { sellerPubKey, selectedAsset, balanceForAsset, destAsset, cartItemAsset_Price} = req.body;
    const _selectedAsset = new StellarSdk.Asset(selectedAsset.asset_code, selectedAsset.asset_issuer);
    const _destAsset = new StellarSdk.Asset(destAsset.asset_code, destAsset.asset_issuer);
    console.log(req.body);
    pathLookUp(pubkey, sellerPubKey, _selectedAsset, balanceForAsset, _destAsset, cartItemAsset_Price)
        .then(path => res.send(path));
})

app.post('/possiblePaths/:pubkey', function (req, res) {
    const pubkey = req.params.pubkey;
    const { assetDictTotals, balances } = req.body;
    lookupAllPaths(pubkey, balances, assetDictTotals)
        .then(paths => res.send(paths));
})

/* 
    Sample curls

    PATHLOOKUP === CHEAPEST PATH

    curl -X POST http://localhost:3008/cheapestPath/GADL2SDMD7XA3SQYBAMBZIWDFZAHHXI2AFESSQZLQVX66T573GGQP5W5 \
        -H "Content-Type: application/json" \
        --data \
        '{ 
            "sellerPubKey": "GDS7EAM5W5H5SIN7UN6XCIVJKYOBDEGFSZHRAE2JDEXNC7LKYDLBRGLY",
            "selectedAsset": {
                "asset_code": "REPO",
                "asset_issuer": "GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B"
            },
            "balanceForAsset": ".23",
            "destAsset": {
                "asset_code": "MOBI",
                "asset_issuer": "GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH"
            },
            "cartItemAsset_Price": ".05"
        }'



    ALL PATHS FOR CART + BALANCES 

    curl -X POST http://localhost:3008/possiblePaths/GADL2SDMD7XA3SQYBAMBZIWDFZAHHXI2AFESSQZLQVX66T573GGQP5W5 \
        -H "Content-Type: application/json" \
        --data \
        '{ 
            "assetDictTotals": 
            {
                "CNY": { "total": 0.0344187, "issuer": "GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX"  }, 
                "MOBI": { "total": 0.087848, "issuer": "GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH" }
            },
            "balances":
            [ 
                { 
                    "balance": "0.2373078",
                    "limit": "922337203685.4775807",
                    "asset_type": "credit_alphanum4",
                    "asset_code": "REPO",
                    "asset_issuer": "GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B" 
                },
                { "balance": "3.8393040", "asset_type": "native" } 
            ]
        }'
*/

// app.listen(pathFinderPort, () => console.log(`Example app listening on port ${pathFinderPort}`))

module.exports = {
    pathLookUp,
    lookupAllPaths    
}