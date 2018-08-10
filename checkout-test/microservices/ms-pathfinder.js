const StellarSdk = require('stellar-sdk'); 
const stellarUtils = require('../helpers/stellar-checkout-utils.js')

// just for testing other than siteKey
const _keys = require('../data/_keys')
const sitePubKey = _keys.siteKey.pubKey;
// mocking the redis cache
const TEMP_pathsDict = require('./temp-paths-cache')

////////////////////////
// TODO: NEED TO VERIFY ADDED TO CACHE: FILLCACHE(PATH) !!!!!
///////////////////////

// checks to see if there exists a path in the cache from a->b that is at or below the destination amount
function pathLookUp(sender, receiver, fromAsset, currentBalance, toAsset, destAmount) {
    return new Promise((res, rej) => {
        const fromAssetLookup = TEMP_pathsDict[fromAsset.getCode()];
        if (!fromAssetLookup) {
            stellarUtils.findCheapestPath(sender, receiver, fromAsset, currentBalance, toAsset, destAmount)
                .then(foundPath => {
                    fillCache(foundPath);
                    res(foundPath);
                });
        } else {
            const toAssetLookup = fromAssetLookup[toAsset.getCode()];
            if (toAssetLookup && toAssetLookup.destinationAmount >= destAmount) {
                res(toAssetLookup);
            }
            else {
                stellarUtils.findCheapestPath(sender, receiver, fromAsset, currentBalance, toAsset, destAmount)
                    .then(foundPath => {
                        fillCache(foundPath);
                        res(foundPath);
                    });
            }
        }
    })
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

// returns { key: total } where key is (Code-Issuer) to make capture different anchors of the same code
function getTotalsByPath(paths) {
    const totals = {};
    paths.map(path => {
        let { 
            source_asset_type,
            source_asset_code,
            source_asset_issuer,
            source_amount
        } = path;
        source_amount = +source_amount;
        if (!source_asset_code && source_asset_type === 'native') {
            source_asset_code = 'XLM';
        } else { 
            source_asset_code = source_asset_code + '-' + source_asset_issuer;
        }
        const curTotal = totals[source_asset_code];
        if (curTotal) {
            totals[source_asset_code] = curTotal + source_amount;
        } else { 
            totals[source_asset_code] = source_amount;
        }
    })
    return totals;
}

//
// TODO: make sure the source amount is <= source_amount
//
// this iterates over balances and the asset-totals to return the paths 
// from all balances to all owed assets
function lookupAllPaths(pubKey, balances, assetDict) {
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
        // .then(res => getTotalsPerAsset(res))
        // .then(res => console.log(res))
}


//      //
// test //
//      //
// pathLookUp(_keys.firstKey.pubKey, stellarUtils.AssetDict.REPO, 10, stellarUtils.AssetDict.MOBI, .1)
//     .then(res => console.log(res))

// pathLookUp(_keys.firstKey.pubKey, _keys.secondKey.pubKey, stellarUtils.AssetDict.REPO, 10, stellarUtils.AssetDict.CNY, 1)
//     .then(res => console.log(res))


module.exports = {
    getTotalsByPath,
    pathLookUp,
    lookupAllPaths    
}