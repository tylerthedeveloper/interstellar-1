
const axios = require('axios');

// can use this for parsing response and type safety, but not needed
// type Ticker {
//     id: string;
//     name;
//     symbol;
//     website_slug;
// }
//

// todo: ensure assetSymbol is provided
async function getTickerList () {
    return await axios.get('https://api.coinmarketcap.com/v2/listings/')
        .then((response) => response.data.data);
}

// rather than load the listings every time, only have to load it once
// as done in the below version of the function 
function getTickerID (tickerList, assetSymbol) {
    for (const ticker of tickerList) {
        if(ticker['symbol'] == assetSymbol) {
            return ticker['id'];
        }
    }
    return 0;
}

// loads entire list but shouldnt be needed
function getNewTickerID (assetSymbol) {
   return axios.get('https://api.coinmarketcap.com/v2/listings/')
        .then((response) => response.data.data)
        .then((data) => {
            for (const ticker of data) {
                if(ticker['symbol'] == assetSymbol) {
                    return ticker['id'];
                }
            }
            return 0;
        }
    );
}

// todo: ensure assetID is provided
async function getUsdPriceForTickerID (assetID) {
    return await axios.get(`https://api.coinmarketcap.com/v2/ticker/${assetID}`)
        .then((response) => response.data.data)
        .then((data) => data.quotes.USD.price)
} 

function runner (assetSymbolList) {
    return getTickerList()
        .then(listings => {
            const tickerList = assetSymbolList.map(symbol => ({symbol: symbol, tickerID: getTickerID(listings, symbol)}));
            const promiseList = tickerList.map(tickerDict => getUsdPriceForTickerID(tickerDict.tickerID));
            return Promise.all(promiseList).then(priceList => 
            {
                tickerList.forEach(function (ticker, index) {
                    ticker['price'] = priceList[index];
                });
                return tickerList;
            });
        }
    );
}

//      //
// test //
//      //
const assetSymbols = ["BTC", "ETH"];
// runner(assetSymbols).then(res => console.log(res));

module.exports = {
    getTickerList,
    getTickerID,
    getUsdPriceForTickerID,
    runner
}
