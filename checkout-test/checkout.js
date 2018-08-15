// Points of entry: 
// onPageLoad: should get called as expected, only fix will be related to promises / integrating GQL + microservices 
// checkout: pressed on confirm transaction, should take to separate page spitting out order confirmation of some sort

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const stellarUtils = require('./helpers/stellar-checkout-utils.js');
const stellarAssetDict = require('./data/stellar-asset-dict')
const checkoutUtils = require('./helpers/checkout-utils');
const usdMicroService = require('./microservices/ms-usd-cacher');
const pathsMicroService = require('./microservices/ms-pathfinder');
const watcherMicroService = require('./microservices/ms-horizon-watcher');


//  THIS ALREADY EXISTS 
// 1. Get items in cart: graphql cart query
// Array<CartItem>
const _cartItems = require('./data/cart-items-data'); 

function getCartItems() {
    // return Promise.resolve(_cartItems); 
    return new Promise((res, rej) => res(_cartItems)); 
}
// const myCartItems = getCartItems()


// 2 handle conversions
// 2.1, get USD current rates: this is for aggregate calculations to see if can 
// TODO: cover entire cart based on USD total 
// const usdPriceDict = usdUtils.getAverageUsdPrices(); // require('./data/temp-price-dict.js').usdPriceDict;


// TODO: get cart items first !!! // make async
// this will get called when the user navigates to the page
function onPageLoad(pubKey) { 
    let _cartItems, _usdPriceDict, _balances;
    const cartItemPromise = getCartItems(),
            usdPricePromise = usdMicroService.getCache(),
            balancesPromise = stellarUtils.getStellarBalances(pubKey);
    return Promise.all( [ cartItemPromise, balancesPromise, usdPricePromise ] )
        .then((res) => {
            _cartItems = myCartItems = res[0];
            _balances = myBalances = res[1];
            _usdPriceDict = res[2];
            checkoutUtils.setPriceAmounts(_usdPriceDict, _cartItems)
            return _cartItems;
        })
        // .catch(err => console.error(err))
        .then(cartItems => {
            myCartTotals = checkoutUtils.combineLikeAssets(cartItems);
            console.log(myCartTotals);
            return myCartTotals;
        })
        .then(assetSet => pathsMicroService.lookupAllPaths(pubKey, _balances, assetSet))
        // .catch(err => console.error(err))
        .then(foundPaths => {
            myBestPaths = foundPaths;
            myPathPageTotals = checkoutUtils.getTotalsByPath(foundPaths);
        });
        // .catch(err => console.error(err))
        // .then(res => console.log(JSON.stringify(res)))
}

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
function createTransactionOps(myCartItems, pmtBuffer) {
    // console.log(myCartItems);
    const promises = myCartItems.map(cartItem => { // operation: <StellarSdk.Operation < payment | pathpayment> >
        const { 
            seller: curSellerPubKey,
            acceptedAsset: {
                    asset_code: cartItemAsset_Code,
                    balance: cartItemAsset_Price,
                    asset_issuer: cartItemAsset_Issuer
            }
        } = cartItem;
        const adj_cartItemAsset_Price = cartItemAsset_Price.toFixed(7);
        const { 
            code: selectedAssetCode, 
            issuer: selectedAssetIssuer
        } = selectedAsset;
        
        let balanceForAsset;
        if (selectedAssetIssuer) {
            balanceForAsset = myBalances.find(bal => (
                bal.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)
            ).balance;
        } else {
            balanceForAsset = myBalances.find(bal => (bal.asset_type === 'native')).balance;
        }
        
        // TODO: If seller has multiple accepted assets, see if any of them match your selected asset        
        // const sellerAcceptedAsset = acceptedAssets.find(asset => 
        //      (asset.asset_code === selectedAssetCode && bal.asset_issuer === selectedAssetIssuer)))
        // if (sellerAcceptedAsset)
        
        // TODO: Check for stellar lumens min thresh IF Lumens
        if (cartItemAsset_Code === selectedAssetCode && cartItemAsset_Issuer === selectedAssetIssuer) { // check if you have the asset
            if (balanceForAsset > adj_cartItemAsset_Price) //check if you have enough
                return Promise.resolve(StellarSdk.Operation.payment({ 
                    destination: curSellerPubKey,
                    asset: selectedAsset, 
                    amount: adj_cartItemAsset_Price
                }));
            else throw new Error('insufficient funds or cannot find a path between yours and the desired assets');
        }
        // TODO: need to use LRU PATH CACHE
        else { // user doesnt have the asset so we try to find a path
            const destAsset = new StellarSdk.Asset(cartItemAsset_Code, cartItemAsset_Issuer);
            // TODO: test added check of not going over balance
            // const cheapestPath = stellarUtils.findCheapestPath(
            //     pagePubKey, curSellerPubKey, selectedAsset, balanceForAsset, destAsset, adj_cartItemAsset_Price
            // );
            const cheapestPath = pathsMicroService.pathLookUp(
                pagePubKey, curSellerPubKey, selectedAsset, balanceForAsset, destAsset, adj_cartItemAsset_Price
            );
            return cheapestPath.then(foundPath => {
                if (!foundPath) return new Error('insufficient funds or cannot find a path between yours and the desired assets');
                // TODO: Not sure how to handle this from a user experience perspective
                else {
                    // console.log(foundPath);
                    return Promise.resolve(
                        stellarUtils.createPathPayment(pagePubKey, curSellerPubKey, foundPath)
                    );
                }
            });
        }
    });
    return Promise.all(promises);
}


function checkout(myCartItems, stellarAssetEnum, pathFinderBuffer) {
    createTransactionOps(myCartItems, stellarAssetEnum, pathFinderBuffer)
        .then(operations => stellarUtils.createTransaction(pagePubKey, pagePrivKey, operations))
        // .catch(err => console.error(err))
        .then(res => {
            console.log(res.hash)
            // console.log( JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(res.envelope_xdr, 'base64')) );
            // console.log("\n \n")
            // console.log( JSON.stringify(StellarSdk.xdr.TransactionResult.fromXDR(res.result_xdr, 'base64')) );
            // console.log("\n \n")
            // console.log( JSON.stringify(StellarSdk.xdr.TransactionMeta.fromXDR(res.result_meta_xdr, 'base64')) );
            // console.log("\n \n")
            return res.hash;
        })
        // .catch(err => console.error(err))
// TODO: NEED TO WAIT FOR CONFIRMATION .... 4 seconds????
        .then(hash => watcherMicroService.lookupTransaction(pagePubKey, hash))
        .then(res => console.log(res))
        // TODO: go to order confirmation
        // .catch(err => console.error(err))
}
// ────────────────────────────────────────────────────────────────────────────────


// data for page
const keySet = require('./data/_keys.js');
const { pubKey: publicKey, privKey: privateKey } = keySet.firstKey;

let pagePubKey = publicKey;
let pagePrivKey = privateKey;
let myCartItems = [];
let myBalances = [];
let myCartTotals = {};
let myPathPageTotals = {};
let selectedAsset = null;
let selectedBuffer;
let myBestPaths = [];


// tests in order of algo
// 1. this works fine, only changes will be around separation of functions + async
onPageLoad(pagePubKey)
    // .then((res) => {
    //     console.log(res)
    //     console.log(myBestPaths)
    //     console.log(myPathPageTotals)
    // });
    

// mock user selections
function onSelectAsset(asset) {
    // this.setState({ selectedAsset: asset });
    selectedAsset = asset;
}
onSelectAsset(stellarAssetDict.REPO);

function onSelectBuffer(buffer) {
    // this.setState({ selectedBuffer: buffer });
    selectedBuffer = buffer;
}
onSelectBuffer(0.015);
// end mock user selections

// // 2. A full checkout on the network for path finding
setTimeout(() => 
    checkout(myCartItems, pagePubKey, myBalances, selectedAsset, selectedBuffer), 3000);
