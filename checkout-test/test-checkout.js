const StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();

// import request from 'request';

const pubKey = 'GDUZVNG4E7AJTCHBNHOQRXUSED7RSVXBZ2NZRFZTZ5TKRGDG5GLV6MAF';
const privKey = 'SCMUH4YUWKAN3GV33T5BD32A2FULPGHC4BJ7KI625BLCJGCVKZV3BHRW';

const pubKey2 = 'GBPL65LCOZ35N26TJEL6SIELSWX4KXJGCRDYWB6CEDOILGR6KKTRHJG3';
const privKey2 = 'SCYY5YZ6FSYRPNF474W627BI6RCBNDBM6ODZ6MS53CC4UOBYUYZN4AGI';

const pubKey3 = 'GBG5JTXIOQEP2W3XJGQPYCJ7633KLFPA4SS5MB7FVOHIOWBXKEH2ZWBJ';
const privKey3 = 'SB2CRANE2SXYNSEW5UTTIGZLKICQKM65LLPLNAVKDVJYWBGTJLV33RU6';

const server = new StellarSdk.Server('https://horizon.stellar.org');

function getStellarBalances (publicKey) {
  return server.loadAccount(publicKey)
      .then(account => account)
      .then(account => account.balances)
      .then(balances => console.log(balances))
}

const ops = [
    {
        destination: pubKey2,
        asset: StellarSdk.Asset.native(),
        amount: "1"
    },
    {
        destination: pubKey3,
        asset: StellarSdk.Asset.native(),
        amount: "1"
    }
];

const operations = ops.map(op => {
    return StellarSdk.Operation.payment({
        destination: op.destination,
        asset: op.asset,
        amount: op.amount
    });
});

// abstract # of ops
// operations = 
    // operations: operation |
    // operations: Array<operation>
function createTransaction(senderPub, senderPriv, operations) {
    server.loadAccount(senderPub)
        .then(function(account){
            let builder; 
            if (!Array.isArray(operations)) {
                builder = new StellarSdk.TransactionBuilder(account)
                    .addOperation(operations);
            }
            else {
                builder.operations = operations;
            } 
            const transaction = builder.build();
            transaction.sign(StellarSdk.Keypair.fromSecret(senderPriv));
            return server.submitTransaction(transaction);
        })
        .then(transactionResult => console.log(transactionResult) )
        .catch(err => console.error(JSON.stringify(err.response.data.extras.result_codes)))
}

// set op type to be created
function createPmtTxAndCheckForTrust(receiverPub, senderPub, senderPriv, pmtObj, opType) {
    // for abstraction of op type
    // pull out op type
        // this can be improved with TS type checks on op type
    // const asset = new String(operation._attributes.body._arm).valueOf(); 
    // if (asset == "paymentOp") {
    // if (asset == "payment") {
    const asset_issuer = pmtObj.asset.issuer;
    
    // TODO: check to see if seller trusts ... if not: do we FORCE THEM?
    getStellarBalances(receiverPub).then(balances => {
        console.log(balances.some(bal => bal.asset_issuer === asset_issuer))
    })

    // server.loadAccount(senderPub)
    //     .then(function(account){
    //         const builder = new StellarSdk.TransactionBuilder(account)
    //             .addOperation(operation)
    //             .build();
    //         transaction.sign(StellarSdk.Keypair.fromSecret(senderPriv));
    //         return server.submitTransaction(transaction);
    //     })
    //     .then(transactionResult => console.log(transactionResult) )
    //     .then(err => console.error(JSON.stringify(err.response.data.extras.result_codes)))
}

const nativeAsset = new StellarSdk.Asset.native();
const mobiAsset = new StellarSdk.Asset( 'MOBI', 'GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH');
const eurtAsset = new StellarSdk.Asset( 'EURT', 'GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S');
const repoAsset = new StellarSdk.Asset( 'REPO', 'GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B');

function changeTrust(pubkey, privkey, asset) {
    server.loadAccount(pubkey)
        .then(function(account){
            const transaction = new StellarSdk.TransactionBuilder(account)
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: asset,
                }))
                .build();
            transaction.sign(StellarSdk.Keypair.fromSecret(privkey));
            return server.submitTransaction(transaction);
        })
        .then(transactionResult => console.log(transactionResult) )
        .then(err => console.log(err) )
}

// changeTrust(pubKey2, privKey2, mobiAsset);
// getStellarBalances(pubKey2)

const mobiAssetOffer = StellarSdk.Operation.manageOffer({
    selling: nativeAsset,
    buying: mobiAsset,
    amount: '3',
    price: `${(3/5)}`,
    source: pubKey
});
// createTransaction(pubKey, privKey, mobiAssetOffer);

const mobiAssetPmtOpt = StellarSdk.Operation.payment({
    destination: pubKey2,
    asset: mobiAsset,
    amount: "1",
    source: pubKey
});

const mobiAssetPmtObj = {
    destination: pubKey2,
    asset: mobiAsset,
    amount: "1",
    source: pubKey
};

const eurtAssetOffer = StellarSdk.Operation.manageOffer({
    selling: nativeAsset,
    buying: eurtAsset,
    amount: '2',
    price: `${(2/3)}`,
    source: pubKey3
});

// createTransaction(pubKey3, privKey3, eurtAssetOffer);
// getStellarBalances(pubKey3)

// need to check for type to know if nee to check for trust
// console.log(typeof mobiAssetPmt);

// createPmtTxAndCheckForTrust(pubKey2, pubKey, privKey, mobiAssetPmtObj, 'payment');

console.log(server.paths(pubKey, pubKey3, repoAsset, 1));


// const mobiAssetPath = StellarSdk.PathCallBuilder({
//     sendAsset: Asset,
//     sendMax: string,
//     destination: string,
//     destAsset: Asset,
//     destAmount: string,
//     path: Asset[],
//     source?: string,
//     destination: pubKey2,
//     asset: mobiAsset,
//     amount: "1",
//     source: pubKey
// });




// const tycoin = new StellarSdk.Asset("Tycoin", "GDNZIMIWPMRQ3X3UNFF7A7XI26XILUP6QBFT6MX7B62GAKVO3ZWDWWUW");
// // server.loadAccount(pub)
// //  .then(function(receiver) {
// //    const transaction = new StellarSdk.TransactionBuilder(receiver)
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
// // //     const transaction = new StellarSdk.TransactionBuilder(issuer)
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