const axios = require('axios');
const CMC_TickerIDs = require('./data/cmc-ticker-data');
const ST_TickerIDs = require('./data/st-ticker-data');
const cmcApiUrl = 'https://api.coinmarketcap.com/v2/ticker';
const stApiUrl = 'https://api.stellarterm.com/v1/ticker.json';

function load_CoinMarketCapPrices() {
    const promises = [];
    Object.keys(CMC_TickerIDs).map(key => promises.push(axios.get(`${cmcApiUrl}/${CMC_TickerIDs[key].id}`)));
    return axios.all(promises)
        .then(axios.spread((...results) => {
            const assets = {};
            results.map(element => element.data.data)
                .map(curAsset => (assets[curAsset.symbol] = {
                    id: curAsset.id,
                    code: curAsset.symbol, 
                    price_USD: curAsset.quotes.USD.price,
                    slug: curAsset.website_slug,
                }));
                return assets;
            }
        ))
        .then(assets => assets)
        .catch(err => console.log(err))
}

function load_StellarTermPrices() {
    return axios.get(stApiUrl)
        .then((response) => response.data.assets)
        .then((tickers) => {
            const assets = {};
            tickers.map(element => {
                const { id, code, issuer, domain, price_USD } = element;
                const dupCode = new String(code + '_' + issuer);
                let thisAsset, thisCode;
                if (ST_TickerIDs[code]) {
                    thisAsset = ST_TickerIDs[code];
                    thisCode = code;
                } else {
                    thisAsset = ST_TickerIDs[dupCode];
                    thisCode = dupCode;
                }
                if (thisAsset && thisAsset.issuer == issuer && thisAsset.domain == domain)
                    assets[thisCode] = {
                        id: id,
                        code: code, 
                        price_USD: price_USD,
                        domain: domain,
                        issuer: issuer
                    };
            });
            return assets;
        })
        .then(assets => assets)
        .catch(err => console.log(err))
}

async function getAverageUsdPrices() {
    const cmc = load_CoinMarketCapPrices();
    const st = load_StellarTermPrices();
    return axios.all([cmc, st])
        .then(axios.spread((...tickerBatches) => {
            const assets = {};            
            tickerBatches.map(batch => {
                // console.log('batch');
                // console.log(batch);
                Object.keys(batch).map(key => {
                    const symbol = batch[key].code;
                    if (!assets[symbol]) assets[symbol] = batch[key];
                    else {
                        const savedPrice = assets[symbol].price_USD;
                        const savedPriceArr = (!Array.isArray(savedPrice)) ? [savedPrice] : savedPrice;
                        const curPrice = batch[key].price_USD;
                        assets[symbol].price_USD = [...savedPriceArr, curPrice];
                    }
                })
            })
            Object.keys(assets).map(key => {
                const savedPrice = assets[key].price_USD;
                if (Array.isArray(savedPrice)) {
                    const len = savedPrice.length;
                    assets[key].price_USD = savedPrice.reduce((a, b) => (a + b)) / len;
                }
            })
            return assets;
        }))
}

//      //
// test //
//      //
// const assetSymbols = ["BTC", "ETH"];

// load_CoinMarketCapPrices().then(res => console.log(res))
// load_StellarTermPrices().then(res => console.log(res))
// getAverageUsdPrices().then(res => console.log(res))

module.exports = {
    getAverageUsdPrices
}
