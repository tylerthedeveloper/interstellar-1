const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const cartItems = require('./cart-items-data');

// 1. Get items in cart: graphql cart query
getCartItems = () => {
     return cartItems; 
}

const myCartItems = getCartItems()

const cmcAPI = require('./testGetUsd.js');

// 2: handle usd conversions of items in cart
//      todo: optimize, load into cache the request of listings and tickers rather than call every time
//      todo: make a liust of most popular coins and have those ID's ready in a text file 
getUsdEquivalentOfAsset = (asset_type, fixedUSDAmount) => {
    const tickerPrice = cmcAPI.getTickerID(asset_type)
        .then(tickerID => cmcAPI.getUsdPriceForTickerID(tickerID)
            .then(tickerPrice => tickerPrice)
        )
    return (fixedUSDAmount / tickerPrice); // careful with precision
}

getCheckUsdValues = (myCartItems) => {
    for (const item in myCartItems)
    {
        if (item.fixedUSDAmount && !item.assetPrice) {
            const currentPrice = getUsdEquivalentOfAsset(item.acceptedAsset.asset_code, item.fixedUSDAmount).then(;
            item.assetPrice = currentPrice;
        }
    }
    console.log(myCartItems[0].acceptedAsset)
}

getCheckUsdValues(myCartItems)


//
// this is For UI and for aggregate calculations to see if can cover entire cart
// 2... combineLikeAssets

// 3....
// get balances from stellar 
// { asset_type: string, balance: string, limit: string, asset_code: string, asset_issuer: string }
getBalancesSDK = (publicKey) => {
  return server.loadAccount(publicKey)
      .then(account => account)
      .map(account => account.balances)
        // account.balances.forEach(function(balance) {
        //   console.log('Type:', balance.asset_type, ', Code:', balance.asset_code, ', Balance:', balance.balance);
        // });
}

// const myBalances = getBalances();

// 3.1:
// need to sort by preference ...
// need to decide structure: array or dict 
    // dict preferred for look up, but need to add order field on it 


// 4 loop through cart and create ops
// var transaction = new StellarSdk.TransactionBuilder(source)
createTransactionOps = (myCartItems) => {
  // if cant hold make each iteration of same structure OR just add on the fly ... 
  const tb = new StellarSdk.TransactionBuilder(pub); 
  const paymentOps = new Array(); // where operation is one of: payment, or pathpayment <StellarSdk.Operation>
  for (const cartItem in myCartItems)
  {
      const curSellerPubKey = cartItem.sellerPubKey;
      const acceptedAsset = cartItem.acceptedAsset;
      const cartItemAssetCode = acceptedAsset.asset_code;
      const cartItemAssetPrice = acceptedAsset.assetPrice;
      // iterate over balances to pay off item
      for (const asset in myBalances)
      {
          const curAssetBalance = AssetBalances[asset.asset_code].balance;
          // break inner for-loop if an item has been paid off
          if (cartItemAssetPrice == 0) 
              break; 
          // skip asset in inner for-loop if an asset has been depleted
          if (asset.balance == 0)
              continue;
          // user has the asset
          if (asset in AssetBalances) {
              cartItemAssetPrice -= curAssetBalance; // look up in dict
              const payOp = { //: <StellarSdk.Operation.payment> = {
                  destination: curSellerPubKey,
                  asset: asset.asset_type, // StellarSdk.Asset.native(), or check isNative... 
                  amount: curAssetBalance
              };
              PaymentOps.add(new StellarSdk.Operation.payment(payOp)); 
              // if cant add dynamically to transactionBuilder just keep a list of ops or op-like dict objects
          }
          // user doesnt have the asset so we try to find a path
          // findPathPayment(cartItemAsset, assetToUse);
          const paymentPath = server.paths(curUserPubKey, sellerPubKey, acceptedAsset, curAssetBalance);
          // cant find payment path, but may be more assets to use instead
          if (!paymentPath) {
              continue;
          }
          else { 
              const payPathOp = {
                  sendAsset: AssetBalances[cartItemAssetCode],
                  sendMax: /* calcSendMax() */ "1000", // maybe some threshold percentage
                  destination: curSellerPubKey,
                  destAsset: cartItem.acceptedAsset,
                  destAmount: curAssetBalance,
                  path: pathArray,
              };
              PaymentOps.add(new StellarSdk.Operation.pathPayment(payPathOp));
          }
      }
      // see error
      if (cartItemAssetPrice > 0) {
          return new Error('insufficient funds or cannot find a path between yours and the desired assets');
      }
  }
  return paymentOps;
}
// 5 build And Submit Transaction
buildAndSubmitTransaction = (/* transaction or ops list */ /* KeyPair */) => {
  // transaction.add(ops)
  // transaction.sign(KeyPair);
  // transaction.build();
  // return server.submitTransaction(transaction);
}