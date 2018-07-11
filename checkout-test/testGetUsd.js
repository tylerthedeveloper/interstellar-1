/** @flow */
// @flow

const axios = require('axios');

// can use this for parsing response and type safety, but not needed
// type Ticker {
//     id: string;
//     name;
//     symbol;
//     website_slug;
// }

// todo: ensure assetSymbol is provided

async function getTickerList () {
    return await axios.get('https://api.coinmarketcap.com/v2/listings/')
                        .then((response) => response.data.data);
}

getTickerID = (tickerList, assetSymbol) => {
    for (const ticker of tickerList) {
        if(ticker['symbol'] == assetSymbol) {
            return ticker['id'];
        }
    }
    return 0;
}
 
// getTickerID = (assetSymbol) => {
//    return axios.get('https://api.coinmarketcap.com/v2/listings/')
//         .then((response) => response.data.data)
//         .then((data) => {
//             for (const ticker of data) {
//                 if(ticker['symbol'] == assetSymbol) {
//                     return ticker['id'];
//                 }
//             }
//             return 0;
//         }
//     );
// }

// todo: ensure assetID is provided
async function getUsdPriceForTickerID (assetID) {
    return await axios.get(`https://api.coinmarketcap.com/v2/ticker/${assetID}`)
        .then((response) => response.data.data)
        .then((data) => data.quotes.USD.price)
}

//
// just have temp comments for data validation
//
// getTickerID("ETH")
//     // if (tickerID)
//     //     console.log(tickerID);
//     // else ... need to enter a ticker symbol
//     .then(tickerID => getUsdPriceForTickerID(tickerID)
//         // const tickerPrice =  getUsdPriceForTickerID( 1 /** tickerID */);
//         // if (tickerPrice)
//         //     console.log(tickerPrice);
//         // else ... need to enter a ticker id number
//         .then(tickerPrice => console.log(tickerPrice))
//     )

// const tickerList =  (async () => await getTickerList().then((response) => response.data.data)) // .then((response) => console.log(response.data.data));

const assetSymbols = ["BTC", "ETH"];

getTickerList()
    .then(listings => {
        const tickerList = assetSymbols.map(symbol => ({symbol: symbol, tickerID: getTickerID(listings, symbol)}));
        console.log(tickerList)
        const priceList = tickerList.map(tickerDict => 
        ({
            symbol: tickerDict.symbol, 
            tickerID: tickerDict.tickerID, 

            // get these prices in a list then merge them in with a thenable
            price: await getUsdPriceForTickerID(tickerDict.tickerID)


        }));
        Promise.all(priceList).then(d => console.log(d));
    });


module.exports = {
    getTickerList,
    getTickerID,
    getUsdPriceForTickerID
}