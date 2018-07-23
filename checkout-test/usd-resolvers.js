const axios = require('axios');
const CMC_TickerIDs = require('./data/cmc-ticker-data');
const ST_TickerIDs = require('./data/st-ticker-data');
const cmcApiUrl = 'https://api.coinmarketcap.com/v2/ticker';
const stApiUrl = 'https://api.stellarterm.com/v1/ticker.json';

function load_CoinMarketCapPrices() {
    const promises = [];
    Object.keys(CMC_TickerIDs).map(key => promises.push(axios.get(`${cmcApiUrl}/${CMC_TickerIDs[key].id}`)));
    return axios.all(promises)
        .then(axios.spread((...results) => 
            results.map(element => element.data.data)
                .map(curAsset => ({
                    id: curAsset.id,
                    code: curAsset.symbol, 
                    price_USD: curAsset.quotes.USD.price,
                    slug: curAsset.website_slug
                }))
        ))
        .then(assets => console.log(assets))
        .catch(err => console.log(err))
}

function load_StellarTermPrices() {
    return axios.get(stApiUrl)
        .then((response) => response.data.assets)
        .then((tickers) => {
            const assets = [];
            tickers.map(element => {
                const { code, issuer, domain, price_USD } = element;
                const dupCode = new String(code + '_' + issuer);
                const thisAsset = ST_TickerIDs[code] || ST_TickerIDs[dupCode];
                if (thisAsset && thisAsset.issuer == issuer && thisAsset.domain == domain )
                    assets.push({
                        code: code, 
                        issuer: issuer,
                        domain: domain,
                        price_USD: price_USD
                    });
            });
            return assets;
        })
        .then(assets => console.log(assets))
        .catch(err => console.log(err))
}

// todo:
function averageUsdPrices(cmcList, stList) {
    return; // avg of 2 when code exists in both
}

//      //
// test //
//      //
// const assetSymbols = ["BTC", "ETH"];

// load_CoinMarketCapPrices();
// load_StellarTermPrices();

module.exports = {
}
