const StellarSdk = require('stellar-sdk');
const stellarUtils = require('../stellar-checkout-utils.js')
const TEMP_pathsDict = require('./temp-paths-cache')
const _keys = require('../data/_keys')

function pathLookUp(sender, fromAsset, currentBalance, toAsset, destAmount) {
    return new Promise((res, rej) => {
        // console.log(fromAsset);
        // console.log(fromAsset.getCode());
        // console.log(TEMP_pathsDict[fromAsset.getCode()]);
        const fromAssetLookup = TEMP_pathsDict[fromAsset.getCode()];
        if (!fromAssetLookup) {
            return stellarUtils.findCheapestPath(sender, _keys.siteKey.pubKey, fromAsset, currentBalance, toAsset, destAmount)
                .then(path => {
                    // fillCache(path);
                    res(path);
                })
        } else {
            const toAssetLookup = fromAssetLookup[toAsset.getCode()];
            if (toAssetLookup && toAssetLookup.destinationAmount >= destAmount) {
                res(toAssetLookup.path);
            }
            else {
                res(stellarUtils.findCheapestPath(sender, _keys.siteKey.pubKey, fromAsset, currentBalance, toAsset, destAmount))
                    // .then(path => {
                    //     // fillCache(path);
                    //     res(path);
                    // })
            }
        }
    })
}

// this will handle the return result of getting a new path
// and fill the cache accordingly
function fillCache(newPath) {
    // fill redis cache with dict
    // deconstruct from, to, path, amount
    // this.cache.add(newPath);   
}

function lookupAllPaths(pubKey, balances, assetDict) {
    // console.log(balances);
    const { 
        asset_code: fromAssetCode, 
        asset_issuer: fromAssetIssuer,
        balance: fromAssetBalance
    } = balances[0];
    const fromAsset = new StellarSdk.Asset(fromAssetCode, fromAssetIssuer);
    const promises = Object.keys(assetDict).map(key => {
        const toAsset = new StellarSdk.Asset(key, assetDict[key].issuer);
        const promise = pathLookUp(pubKey, fromAsset, fromAssetBalance, toAsset, assetDict[key].total);
        return promise;
    })
    Promise.all(promises)
        .then(res => console.log(res))
}


// test
// pathLookUp(_keys.firstKey, _keys.thirdKey, stellarUtils.AssetDict.REPO, 10, stellarUtils.AssetDict.MOBI, 3)
//     .then(res => console.log(res))

// pathLookUp(_keys.firstKey.pubKey, _keys.secondKey.pubKey, stellarUtils.AssetDict.REPO, 10, stellarUtils.AssetDict.CNY, 1)
//     .then(res => console.log(res))


module.exports = {
    lookupAllPaths    
}