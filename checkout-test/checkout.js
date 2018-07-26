// Points of entry: 
// onPageLoad: should get called as expected, only fix will be related to promises / integrating GQL + microservices 
// checkout: pressed on confirm transaction, should take to separate page spitting out order confirmation of some sort

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');
const stellarUtils = require('./stellar-checkout-utils.js');
const usdUtils = require('./usd-resolvers.js');

//
//  THIS ALREADY EXISTS 
//
// 1. Get items in cart: graphql cart query
// Array<CartItem>
const _cartItems = require('./data/cart-items-data'); 

function getCartItems() {
    // return await Promise.resolve(_cartItems); 
    return _cartItems; 
}

const myCartItems = getCartItems()


// 2 get stellar balances
// get balances from stellar (horizon = "https://horizon.stellar.org/accounts/")
// Array < { asset_type: string, balance: string, limit: string, asset_code: string, asset_issuer: string } >

const publicKey = "GDUZVNG4E7AJTCHBNHOQRXUSED7RSVXBZ2NZRFZTZ5TKRGDG5GLV6MAF";
const privateKey = 'SCMUH4YUWKAN3GV33T5BD32A2FULPGHC4BJ7KI625BLCJGCVKZV3BHRW';

// TODO: Use this here
function loadBalances(pubKey) {
    return stellarUtils.getStellarBalances(pubKey);
}
const myBalances = /* loadBalances(publicKey) */ [ 
    { 
        balance: '9.5534911',
        limit: '922337203685.4775807',
        asset_type: 'credit_alphanum4',
        asset_code: 'MOBI',
        asset_issuer: 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH' },
    { 
      balance: '1.5034706', asset_type: 'native' 
    } 
];


// 3 handle conversions
// 3.1, get USD current rates: this is for aggregate calculations to see if can cover entire cart based on USD total 

// pull from local for testing
// const usdPriceDict = require('./data/temp-price-dict.js').usdPriceDict;
const usdPriceDict = usdUtils.getAverageUsdPrices();
// console.log(usdPriceDict);

// TODO: combine 3.2 and 3.3 into one iteration
// 3.2, update cart items so every item has a { usd, asset.balance } pair
    
// when they DONT list usd price
function convertToUsd(asset_code, amount, usdPriceDict) {
    const usdPrice = usdPriceDict[asset_code].price_USD;
    return (usdPrice * amount);
}

// when they DO list usd price
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
// test //
// setPriceAmounts(usdPriceDict, myCartItems);
// console.log(myCartItems);

function onPageLoad(pubKey) { 
    // load items right away to show to user and then update them when we know the usd prices map has loaded
    let _cartItems;
    getCartItems().then(cartItems => {
        // get and set cart items
        /* this.myCartItems = */ console.log(cartItems)
        _cartItems = cartItems;
    })

    // this is async and we can let it happen in the background knowing we'll be pulling from a cached micro-service
    usdUtils.getAverageUsdPrices().then(usdPriceDict => {
        console.log(usdPriceDict) 
        setPriceAmounts(usdPriceDict, _cartItems)
        console.log(_cartItems)
    })
    
    // this can be made async and occur in the background
    loadBalances(pubKey).then(balances => /* this.balances = */ console.log(myBalances))
    
}


// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────



// todo: get better clarity on use cases for this
// 3.3 get totals { usd, asset.balance }
function combineLikeAssets(cartItems) {
    const assetDict = {};
    cartItems.map(cartItem => {
        const savedUsdValue = assetDict['USD'];
        const curUsdValue = cartItem.fixedUSDAmount;
        if (savedUsdValue) assetDict['USD'] += curUsdValue;
        else assetDict['USD'] = curUsdValue;
        const code = cartItem.acceptedAsset.asset_code;
        const savedValue = assetDict[code];
        const curValue = +cartItem.acceptedAsset.balance.toFixed(7);
        if (savedValue) assetDict[code] += curValue;
        else assetDict[code] = curValue;
    });
    return assetDict;
}

// test //
// console.log(combineLikeAssets(myCartItems));


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