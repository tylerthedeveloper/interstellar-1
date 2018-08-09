// Points of entry: 
// onPageLoad: should get called as expected, only fix will be related to promises / integrating GQL + microservices 
// checkout: pressed on confirm transaction, should take to separate page spitting out order confirmation of some sort

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');
const stellarUtils = require('./stellar-checkout-utils.js');
const usdUtils = require('./usd-resolvers.js');
const usdMicroService = require('./microservices/ms-usd-cache');
const pathsMicroService = require('./microservices/ms-pathfinder');

//
// data for page
// 
const keySet = require('./data/_keys.js');
const { pubKey: publicKey, privKey: privateKey } = keySet.firstKey;

//
//  THIS ALREADY EXISTS 
//
// 1. Get items in cart: graphql cart query
// Array<CartItem>
const _cartItems = require('./data/cart-items-data'); 

function getCartItems() {
    return Promise.resolve(_cartItems); 
    // return new Promise((res, rej) => res(_cartItems)); 
}

const myCartItems = getCartItems()


// 2 handle conversions
// 2.1, get USD current rates: this is for aggregate calculations to see if can 
// TODO: cover entire cart based on USD total 

const usdPriceDict = usdUtils.getAverageUsdPrices(); // require('./data/temp-price-dict.js').usdPriceDict;

// 3.2, update cart items so every item has a { usd, asset.balance } pair
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

function setPriceAmounts(usdPriceDict, cartItems) {
    cartItems.map(cartItem => {
        const usdValue = cartItem.fixedUSDAmount;
        const asset_code = cartItem.acceptedAsset.asset_code;
        const balance = cartItem.acceptedAsset.balance;
        if (usdValue != 0) cartItem.acceptedAsset.balance = convertToAsset(asset_code, usdValue, usdPriceDict);
        else cartItem.fixedUSDAmount = convertToUsd(asset_code, balance, usdPriceDict);
    });
}

// todo: get better clarity on use cases for this
// get totals { asset_code: balance }
function combineLikeAssets(cartItems) {
    const assetDict = {};
    cartItems.map(cartItem => {

        // TODO: do we need USD?? if so where do we use it 
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

function onPageLoad(pubKey) { 
    let _cartItems;
    let _usdPriceDict;
    let _balances;
    const cartItemPromise = getCartItems();
    const usdPricePromise = usdMicroService.getCache();
    const balancesPromise = stellarUtils.getStellarBalances(pubKey);
// this can be made async and occur in the background ... NEED TO set to page balances

    let assetSet = {};    
    Promise.all( [ cartItemPromise, balancesPromise, usdPricePromise ] )
        .then((res) => {
            _cartItems = res[0];
            _balances = res[1];
            _usdPriceDict = res[2];
            setPriceAmounts(_usdPriceDict, _cartItems)

            // catch current bug
            // console.log(_balances);
            // console.log(_usdPriceDict);
            return _cartItems;
        })
        // .catch(err => console.error(err))
        .then(cartItems => combineLikeAssets(cartItems))
        // .catch(err => console.error(err))
        .then(assetSet => {
            return pathsMicroService.lookupAllPaths(pubKey, _balances, assetSet);
            // console.log(paths);
        })
        // .catch(err => console.error(err))
}

onPageLoad(publicKey);

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────





// 3.4: not sure how we're doing this yet, depends on UI
// todo: get better clarity on use cases for this
// need to sort by preference for asset
// need to be able to select on the fly
// this will probably be a UI select and a simple lookup, i.e.
// (selectedAsset) => balances.find(balance => balance.asset_code == selectedAsset.asset_code)


// 4 loop through cart and create ops
// could be optimized if: 
    // given selected asset from balances instead of looking it up
    // TODO: figure out how to logically group paths / payments / transactions
    // TODO: Allow for multiple asset balances update them locally after each transaction is made to keep track
        // How to determine which assets the user is willing ti buy with?
function createTransactionOps(myCartItems, publicKey, myBalances, selectedAsset, pmtBuffer) {
    return Promise.all(myCartItems.map(cartItem => { // operation: <StellarSdk.Operation < payment | pathpayment> >
        const { 
            seller: curSellerPubKey,
            acceptedAsset: {
                    asset_code: cartItemAsset_Code,
                    balance: cartItemAsset_Price,
                    asset_issuer: cartItemAsset_Issuer
            }
        } = cartItem;
        const { 
            code: selectedAssetCode, 
            issuer: selectedAssetIssuer 
        } = selectedAsset;
        const { balance: balanceForAsset } = myBalances.find(bal => (
            bal.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)
        );
        
        // TODO: Check for stellar lumens min thresh IF Lumens
        // TODO: If seller has multiple accepted assets, see if any of them match your selected asset        
        // const sellerAcceptedAsset = acceptedAssets.find(asset => 
        //      (asset.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)))
        // if (sellerAcceptedAsset)
        if (cartItemAsset_Code === selectedAssetCode && cartItemAsset_Issuer === selectedAssetIssuer) { // check if you have the asset
            if (balanceForAsset > cartItemAsset_Price) //check if you have enough
                return StellarSdk.Operation.payment({ 
                    destination: curSellerPubKey,
                    asset: selectedAsset, 
                    amount: cartItemAsset_Price.toFixed(7)
                });
        }
        else { // user doesnt have the asset so we try to find a path
            const destAsset = new StellarSdk.Asset(cartItemAsset_Code, cartItemAsset_Issuer);
            // TODO: test added check of not going over balance
            const cheapestPath = stellarUtils.findCheapestPath(
                publicKey, curSellerPubKey, selectedAsset, balanceForAsset, destAsset, cartItemAsset_Price
            );
            return cheapestPath.then(foundPath => {
                if (!foundPath) return new Error('insufficient funds or cannot find a path between yours and the desired assets');
                // TODO: Not sure how to handle this from a user experience perspective
                else return foundPath;
          });
        }
    }));
} 

function checkout(myCartItems, publicKey, myBalances, stellarAssetEnum, pathFinderBuffer) {
    createTransactionOps(myCartItems, publicKey, myBalances, stellarAssetEnum, pathFinderBuffer)
        .then(operations => stellarUtils.createTransaction(publicKey, privateKey, operations))
        .catch(err => console.error(err))
        .then(res => console.log(res)) // go to order confirmation
        .catch(err => console.error(err))
}


// tests
// 1. this works fine, only changes will be around separation of functions + async
// onPageLoad(publicKey);

// 2. A full checkout on the network for path finding
// checkout(myCartItems, publicKey, myBalances, stellarUtils.AssetDict.MOBI, 0.015)