const express = require('express')
const app = express()

const watcherUtils = require('../helpers/watcher-utils');
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();
const server = new StellarSdk.Server('https://horizon.stellar.org');

const config =  require('../../packages/gateway/config/config.json');
const { Pool } =  require('pg');

const usdMicroService = require('./ms-usd-cacher');

const pool = new Pool({
    user: 'postgres',
    host: 'interstellar.market',
    database: 'silent_shop',
    password: config.pg.password,
    port: 5432,
});

app.post('/createTransaction', function (req, res) {
    // const { /* user_id, publicKey, */  selectedAsset, pathFinderBuffer } = req.body;
    const selectedAsset =  new StellarSdk.Asset( 'REPO', 'GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B');
    const pathFinderBuffer = 0.015;
    const user_id = "40212e1c-aaf5-4c2c-a988-bfbe30360966";
    const publicKey = "GADL2SDMD7XA3SQYBAMBZIWDFZAHHXI2AFESSQZLQVX66T573GGQP5W5";
    const promises = [];
    const query = {
        text: 'SELECT name, quantity, usd_cost, asset_code, asset_issuer, asset_type, stellar_public_key ' +
                'from CART C, PRODUCTS P, ASSETS A, USERS U ' + 
                'where C.item_id = P.id AND C.user_id = $1 AND ' +
                'U.id = P.seller_id AND ' +
                'P.accepted_asset = A.id;',
        values: [ user_id ]
    };
    promises.push(usdMicroService.getAverageUsdPrices());
    promises.push(watcherUtils.getStellarBalances(publicKey));
    promises.push(pool.query(query))
    let myBalances = []; usdPriceDict = {}, 
    Promise.all(promises)
        .then(res => {
            usdPriceDict = res[0];
            myBalances = res[1];
            return res[2].rows; // cart Items
        })
        .then(queryResult => {
            const cartItems = queryResult.map(qr => {
                const { name, quantity, usd_cost, asset_code, asset_issuer, asset_type, stellar_public_key } = qr;
                const asset = watcherUtils.getAssetFromData(asset_code, asset_issuer, asset_type);
                return {
                    name: name,
                    quantity: quantity,
                    usd_cost: usd_cost,
                    seller: stellar_public_key.trim(),
                    accepted_asset: asset
                };
            });
            watcherUtils.setPriceAmounts(usdPriceDict, cartItems);
            return cartItems;
        })
        .then(cartItems => watcherUtils.createTransactionOps(publicKey, cartItems, myBalances, selectedAsset, pathFinderBuffer))
        .then(operations => watcherUtils.createTransaction(publicKey, operations))
        // .then(res => console.log(res))
        .then(transaction => {
            console.log(transaction);
            res.send(transaction)
        });
})


function updateTransactionConfirmation(transactionID) {
    const query = {
        text: "UPDATE TRANSACTIONS SET STATUS = 'Confirmed' WHERE ID = $1",
        values: [ transactionID ]
    };
    return pool.query(query);
}

const txHandler = function (txResponse) {
    const { hash } = txResponse;
    updateTransactionConfirmation(hash)
        // TODO: ???
        .then(res => console.log(res))
};

// gateway.transactions()
//     .stream({
//         onmessage: txHandler
//     })