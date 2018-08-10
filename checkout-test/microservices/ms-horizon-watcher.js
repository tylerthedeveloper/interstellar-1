const StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');
const _keys = require('../data/_keys')


function postTransaction(transaction) {
    // set tag on transaction as 'UNCONIFMRED'
    // ... add transaction to database 
}

// returns array of transaction objects
function getTempTaggedTransactions(transaction) {
    // ... query database table 
    // select * from transaction where tag = 'UNCONFIRMED'
}

// returns whether the transaction exists and if it matches the pub key of the buyer
    // returns true if it exists and above is true
    // returns false if it does NOT exist or it exists and does NOT match
function lookupTransaction(pubKey, transactionID) {
    // ... add transaction to database
    return server.transactions()
        .transaction(transactionID)
        .call()
        .then(res => res.source_account === pubKey)
        .catch(err => false)
}

//
// test //
//
// lookupTransaction(_keys.firstKey.pubKey, 'a2441965f5f126c67bc0163ecd38776209cb2631fb698c41da3c050fddff2312')
//     .then(res => console.log(res))