const express = require('express')
const app = express()
// const bodyParser = require('body-parser');

const watcherUtils = require('../helpers/watcher-utils');
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');

const config =  require('../../config.json');
const { Pool } =  require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'interstellar.market',
    database: 'silent_shop',
    password: config.pg.password,
    port: 5432,
});

const getStellarBalances = (publicKey) => {
    return server.loadAccount(publicKey)
        .then(account => account.balances)
        .catch(err => console.log(err))
}

// app.post('/createTransaction', function (req, res) {
    // const { /* user_id, publicKey, */  selectedAsset, pathFinderBuffer } = req.body;
    const selectedAsset =  new StellarSdk.Asset( 'REPO', 'GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B');
    const pathFinderBuffer = 0.015;
    const user_id = "40212e1c-aaf5-4c2c-a988-bfbe30360966";
    const publicKey = "GADL2SDMD7XA3SQYBAMBZIWDFZAHHXI2AFESSQZLQVX66T573GGQP5W5";
    const promises = [];
    const query = {
        text: 'SELECT * from CART where user_id = $1',
        values: [user_id]
    }
    promises.push(pool.query(query))
    promises.push(getStellarBalances(publicKey));
    let myCartItems = [], myBalances = [];
    Promise.all(promises)
        .then(res => {
            myCartItems = res[0].rows;
            myBalances = res[1];
            return myCartItems;
        })
        .then(cartItemIDs => {
            const productIDs = cartItemIDs.map(row => String(row.item_id))
            const query = {
                text: "SELECT * from PRODUCTS where id = ANY($1::uuid[])",
                values: [ productIDs ]
            }
            return pool.query(query);
        })
        .then(queryResult => queryResult.rows)
        .then(cartItems => watcherUtils.createTransactionOps(cartItems, myBalances, selectedAsset, pathFinderBuffer))
        .then(operations => watcherUtils.createTransaction(publicKey, operations))
        .then(transaction => {
            console.log(transaction);
            res.send(transaction)
        });
// })


function updateTransactionConfirmation(transactionID) {
    const query = `UPDATE TRANSACTION SET STATUS = 'Confirmed' WHERE ID = ${transactionID};`;
    //  execute query
}

const txHandler = function (txResponse) {
    const { hash } = txResponse;
    updateTransactionConfirmation(transactionID);
};

// server.transactions()
//     .stream({
//         onmessage: txHandler
//     })