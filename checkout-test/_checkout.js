// todo!!!!
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');
const usdUtils = require('./usd-resolvers.js');
const stellarUtils = require('./stellar-checkout-utils.js');

// 1. Get items in cart: graphql cart query
const _cartItems = require('./data/cart-items-data');

function getCartItems() {
     return _cartItems; 
}

const myCartItems = getCartItems()

// console.log(myCartItems);

// ────────────────────────────────────────────────────────────────────────────────

// 2 get stellar balances
const pubKey = "GDUZVNG4E7AJTCHBNHOQRXUSED7RSVXBZ2NZRFZTZ5TKRGDG5GLV6MAF";

// get balances from stellar (horizon = "https://horizon.stellar.org/accounts/")
// Array < { asset_type: string, balance: string, limit: string, asset_code: string, asset_issuer: string } >

// const myBalances = stellarUtils.getStellarBalances(pubKey);
// myBalances.then(res => console.log(res));


// 2.1 Combine Like Assets of cart items
// 2.1.1 this is For UI
function combineLikeAssets(cartItems) {
    const assetDict = {};
    cartItems.map(cartItem => {
        const savedValue = assetDict[cartItem.acceptedAsset.asset_code];
        const curValue = +cartItem.acceptedAsset.balance.toFixed(7);
        if (savedValue) assetDict[cartItem.acceptedAsset.asset_code] += curValue;
        else assetDict[cartItem.acceptedAsset.asset_code] = curValue;
    });
    return assetDict;
}

console.log(combineLikeAssets(myCartItems));


// 2.1.2 this for aggregate calculations to see if can cover entire cart based on USD total ... 



// // 2.2:
// // need to sort by preference ...
// // need to decide structure: array or dict
//     // dict preferred for look up, but need to add order field on it

// 3 handle usd conversions of items in cart
// 3.1 get usd equivalent given current ticker price dict and item with associated asset preference
// function getUsdEquivalentOfAsset (usdPriceDict, item) {
//     const asset_type = item.acceptedAsset.asset_code;
//     const fixedUSDAmount = item.fixedUSDAmount;
//     const tickerPrice = usdPriceDict.find(ticker => ticker['symbol'] === asset_type).price;
//     if (tickerPrice) return (fixedUSDAmount / tickerPrice); // careful with precision
//     else return NaN;
// }

// // 3.2 check / set trust for asset


// // TODO: INEFFICIENT: repeat loop over items and duplicate conditional checks
//     // this is because i want to group promises together for lookup and because 
//     // dont currently have a hard-coded list of accepted assets, so need to look up every time.
//     // Will be fixed with the above.
// function  getCheckUsdValues (myCartItems) {
//     const getUsdValuesList = [];
//     for (const item of myCartItems)
//     {
//         const asset = item.acceptedAsset;
//         if (item.fixedUSDAmount && (!asset.balance || asset.balance == 0)) {
//             getUsdValuesList.push(asset.asset_code);
//         }``
//     }
//     cmcAPI.runner(getUsdValuesList).then(usdPriceDict => {
//         for (let index = 0; index < myCartItems.length; index++)
//         {
//             const item = myCartItems[index];
//             const asset = item.acceptedAsset;
//             if (item.fixedUSDAmount && (!asset.balance || asset.balance == 0)) {
//                 const currentPrice = getUsdEquivalentOfAsset(usdPriceDict, item);
//                 const newAsset = asset;
//                 newAsset.balance = currentPrice;
//                 item.acceptedAsset = newAsset;
//             }
//         }
//         console.log(myCartItems[0].acceptedAsset)
//     });
// }

// // getCheckUsdValues(myCartItems)


// // // 4 loop through cart and create ops
// // // var transaction = new StellarSdk.TransactionBuilder(source)
// // createTransactionOps = (myCartItems) => {
// //   // if cant hold make each iteration of same structure OR just add on the fly ...
// //   const tb = new StellarSdk.TransactionBuilder(pub);
// //   const paymentOps = new Array(); // where operation is one of: payment, or pathpayment <StellarSdk.Operation>
// //   for (const cartItem in myCartItems)
// //   {
// //       const curSellerPubKey = cartItem.sellerPubKey;
// //       const acceptedAsset = cartItem.acceptedAsset;
// //       const cartItemAssetCode = acceptedAsset.asset_code;
// //       const cartItemAssetPrice = acceptedAsset.assetPrice;
// //       // iterate over balances to pay off item
// //       for (const asset in myBalances)
// //       {
// //           const curAssetBalance = AssetBalances[asset.asset_code].balance;
// //           // break inner for-loop if an item has been paid off
// //           if (cartItemAssetPrice == 0)
// //               break;
// //           // skip asset in inner for-loop if an asset has been depleted
// //           if (asset.balance == 0)
// //               continue;
// //           // user has the asset
// //           if (asset in AssetBalances) {
// //               cartItemAssetPrice -= curAssetBalance; // look up in dict
// //               const payOp = { //: <StellarSdk.Operation.payment> = {
// //                   destination: curSellerPubKey,
// //                   asset: asset.asset_type, // StellarSdk.Asset.native(), or check isNative...
// //                   amount: curAssetBalance
// //               };
// //               PaymentOps.add(new StellarSdk.Operation.payment(payOp));
// //               // if cant add dynamically to transactionBuilder just keep a list of ops or op-like dict objects
// //           }
// //           // user doesnt have the asset so we try to find a path
// //           // findPathPayment(cartItemAsset, assetToUse);
// //           const paymentPath = gateway.paths(curUserPubKey, sellerPubKey, acceptedAsset, curAssetBalance);
// //           // cant find payment path, but may be more assets to use instead
// //           if (!paymentPath) {
// //               continue;
// //           }
// //           else {
// //               const payPathOp = {
// //                   sendAsset: AssetBalances[cartItemAssetCode],
// //                   sendMax: /* calcSendMax() */ "1000", // maybe some threshold percentage
// //                   destination: curSellerPubKey,
// //                   destAsset: cartItem.acceptedAsset,
// //                   destAmount: curAssetBalance,
// //                   path: pathArray,
// //               };
// //               PaymentOps.add(new StellarSdk.Operation.pathPayment(payPathOp));
// //           }
// //       }
// //       // see error
// //       if (cartItemAssetPrice > 0) {
// //           return new Error('insufficient funds or cannot find a path between yours and the desired assets');
// //       }
// //   }
// //   return paymentOps;
// // }
// // // 5 build And Submit Transaction
// // buildAndSubmitTransaction = (/* transaction or ops list */ /* KeyPair */) => {
// //   // transaction.add(ops)
// //   // transaction.sign(KeyPair);
// //   // transaction.build();
// //   // return gateway.submitTransaction(transaction);
// // }