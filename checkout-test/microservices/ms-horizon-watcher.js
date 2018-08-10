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
        .then(res => {
            console.log(res);
            console.log(res.source_account);
            console.log(pubKey);
            console.log(res.source_account === pubKey);
            return res.source_account === pubKey;
        })
        .catch(err => {
            console.log('this is an err');
            console.error(err);
            return false;
        });
}

//
// test //
//
// lookupTransaction(_keys.firstKey.pubKey, 'da5f01a6eaf5454748b20a5619c91cc5a14df9dcbfe120bb62270f9a6da593b1')
//     .then(res => console.log(res))

module.exports = {
    lookupTransaction
}