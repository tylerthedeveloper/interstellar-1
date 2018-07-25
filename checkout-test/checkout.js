// todo!!!!
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');
const stellarUtils = require('./stellar-checkout-utils.js');
const usdUtils = require('./usd-resolvers.js');

// 1. Get items in cart: graphql cart query
// Array<CartItem>
const _cartItems = require('./data/cart-items-data'); 

function getCartItems() {
     return _cartItems; 
}

const myCartItems = getCartItems()


// 2 get stellar balances
// get balances from stellar (horizon = "https://horizon.stellar.org/accounts/")
// Array < { asset_type: string, balance: string, limit: string, asset_code: string, asset_issuer: string } >

const publicKey = "GDUZVNG4E7AJTCHBNHOQRXUSED7RSVXBZ2NZRFZTZ5TKRGDG5GLV6MAF";
const privateKey = 'SCMUH4YUWKAN3GV33T5BD32A2FULPGHC4BJ7KI625BLCJGCVKZV3BHRW';

// const myBalances = stellarUtils.getStellarBalances(pubKey);
// myBalances.then(res => console.log(res));

const myBalances = [ 
    { 
        balance: '15.5472154',
        limit: '922337203685.4775807',
        asset_type: 'credit_alphanum4',
        asset_code: 'MOBI',
        asset_issuer: 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH' 
    },
    { balance: '5.2936506', asset_type: 'native' } 
];


// 3 handle conversions
// 3.1, get USD current rates: this is for aggregate calculations to see if can cover entire cart based on USD total 

// pull from local for testing
const usdPriceDict = require('./data/temp-price-dict.js').usdPriceDict;
// console.log(usdPriceDict);
// const usdPriceDict = usdUtils.getAverageUsdPrices();

// mock the async
// setTimeout(() => {
    // usdPriceDict.then(res => console.log(res));
// }, 1500);


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
        if (usdValue) cartItem.acceptedAsset.balance = convertToAsset(asset_code, usdValue, usdPriceDict);
        else cartItem.fixedUSDAmount = convertToUsd(asset_code, balance, usdPriceDict);
    });
}
// test //
// setPriceAmounts(usdPriceDict, myCartItems);
// console.log(myCartItems);

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
// console.log();
// console.log(combineLikeAssets(myCartItems));


// 3.4:
// need to sort by preference for asset
// need to be able to select on the fly
// this will probably be a UI select and a simple lookup, i.e.
// (selectedAsset) => balances.find(balance => balance.asset_code == selectedAsset.asset_code)


// 4 loop through cart and create ops
// could be optimized if: 
    // given selected asset from balances instead of looking it up
    // TODO: figure out how to logically group paths / payments
    // TODO: add multiple accepted assets
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
        // todo: If seller has multiple accepted assets, see if any of them match your selected asset
        
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
            const cheapestPath = stellarUtils.findCheapestPath(
                publicKey, curSellerPubKey, selectedAsset, destAsset, cartItemAsset_Price
            );            
            return cheapestPath.then(foundPath => {
                if (!foundPath) return new Error('insufficient funds or cannot find a path between yours and the desired assets');
                else return foundPath;
          });
        }
    }));
} 
 
createTransactionOps(myCartItems, publicKey, myBalances, stellarUtils.AssetDict.MOBI, 0.015)
    .then(operations => stellarUtils.createTransaction(publicKey, privateKey, operations))
    .then(res => console.log(res))
