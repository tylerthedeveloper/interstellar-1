// var StellarSdk = require('stellar-sdk');
// StellarSdk.Network.useTestNetwork();
// var request = require('request');
// // var pair = StellarSdk.Keypair.random();
// // console.log(pair.secret());
// // console.log(pair.publicKey());
// var pub = "GDNZIMIWPMRQ3X3UNFF7A7XI26XILUP6QBFT6MX7B62GAKVO3ZWDWWUW";
// var priv = "SA5QWCRENVYK2Y43PPEELT3E4SP6LA5ILAPCH4W5P6SJ5XXTIYIPUJUX";
// var pair = StellarSdk.Keypair.fromSecret(priv);
// var pub2 = "GCC4KURTZ6NAYFU6UR65G6VWAEQWRAJDHWCGEDDGZHRYCMLYNV4FCF25";
// var priv2 = "SBQMHQ4MOGF7XVBV3OX6MEZKAA2U2JZJX7VT3M5J7XHNYYVYDZSUMPHI";
// var pair2 = StellarSdk.Keypair.fromSecret(priv2);
// // request.get({
// //   url: 'https://friendbot.stellar.org',
// //   qs: { addr: pub2 },
// //   json: true
// // }, function(error, response, body) {
// //   if (error || response.statusCode !== 200) {
// //     console.error('ERROR!', error || body);
// //   }
// //   else {
// //     console.log('SUCCESS! You have a new account :)\n', body);
// //   }
// // });
// var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
// // server.loadAccount(pub2).then(function(account) {
// //     console.log('Balances for account: ' + pub2);
// //     account.balances.forEach(function(balance) {
// //       // console.log('Type:', balance.asset_type, ', Code:', balance.asset_code, ', Balance:', balance.balance);
// //         console.log(JSON.stringify(balance));
// //     });
// // });
// var tycoin = new StellarSdk.Asset("Tycoin", "GDNZIMIWPMRQ3X3UNFF7A7XI26XILUP6QBFT6MX7B62GAKVO3ZWDWWUW");
// // server.loadAccount(pub)
// //  .then(function(receiver) {
// //    var transaction = new StellarSdk.TransactionBuilder(receiver)
// //      .addOperation(StellarSdk.Operation.changeTrust({
// //        asset: tycoin,
// //        limit: '1000'
// //      }))
// //      .build();
// //    transaction.sign(pair);
// //    return server.submitTransaction(transaction);
// //  })
// //  .then(function() {
// //    return server.loadAccount(pub)
// //  })
// // //   .then(function(issuer) {
// // //     var transaction = new StellarSdk.TransactionBuilder(issuer)
// // //       .addOperation(StellarSdk.Operation.payment({
// // //         destination: pub2,
// // //         asset: tycoin,
// // //         amount: '10'
// // //       }))
// // //       .build();
// // //     transaction.sign(pair);
// // //     return server.submitTransaction(transaction);
// // //   })
// // //   .catch(function(error) {
// // //     console.error('Error!', error);
// // //   });
// // // source: string,
// // // destination: string,
// // // destinationAsset: Asset,
// // // destinationAmount: string,
// console.log(server.paths(pub2, pub, tycoin, 1));