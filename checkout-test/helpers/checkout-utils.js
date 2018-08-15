// update cart items so every item has a { usd, asset.balance } pair
// THIS IS when they DONT list usd price
function convertToUsd(asset_code, amount, usdPriceDict) {
    const usdPrice = usdPriceDict[asset_code].price_USD;
    return (usdPrice * amount);
}

// THIS IS when they DO list usd price
function convertToAsset(asset_code, fixedUsdPrice, usdPriceDict) {
    const usdPrice = usdPriceDict[asset_code].price_USD;
    return (fixedUsdPrice / usdPrice);
}

// updates cart items, given the price dict
// sets the asset prices based on the fixed USD amount or asset amount
function setPriceAmounts(usdPriceDict, cartItems) {
    cartItems.map(cartItem => {
        const usdValue = cartItem.fixedUSDAmount;
        const { asset_code, balance } = cartItem.acceptedAsset;
        if (usdValue != 0) cartItem.acceptedAsset.balance = convertToAsset(asset_code, usdValue, usdPriceDict);
        else cartItem.fixedUSDAmount = convertToUsd(asset_code, balance, usdPriceDict);
    });
}

// get totals { asset_code: balance }
function combineLikeAssets(cartItems) {
    const assetDict = {};
    cartItems.map(cartItem => {

        // TODO: do we need USD?? if so where do we use it 
        // this should be used to just display to user separately, otherwise it will be picked up by algo

        // const curUsdValue = cartItem.fixedUSDAmount;
        // if (assetDict['USD']) {
        //     assetDict['USD'].total += curUsdValue;
        // } else {
        //     assetDict['USD'] = { total: curUsdValue };
        // }

        const { asset_code: code, asset_issuer: issuer } = cartItem.acceptedAsset;
        const curValue = +cartItem.acceptedAsset.balance.toFixed(7);
        if (assetDict[code] && assetDict[code].issuer === issuer) {
            assetDict[code].total += curValue;
        } else {
            assetDict[code] = { total: curValue, issuer: issuer };
        }
    });
    return assetDict;
}

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


module.exports = { 
    convertToUsd,
    convertToAsset,
    setPriceAmounts,
    combineLikeAssets,
    getTotalsByPath
}