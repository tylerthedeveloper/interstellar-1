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
getTickerID = (assetSymbol) => {
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
getUsdPriceForTickerID = (assetID) => {
    return axios.get(`https://api.coinmarketcap.com/v2/ticker/${assetID}`)
        .then((response) => response.data.data)
        .then((data) => data.quotes.USD.price)
}

//
// just have temp comments for data validation
//
getTickerID("ETH")
    // if (tickerID)
    //     console.log(tickerID);
    // else ... need to enter a ticker symbol
    .then(tickerID => getUsdPriceForTickerID(tickerID)
        // const tickerPrice =  getUsdPriceForTickerID( 1 /** tickerID */);
        // if (tickerPrice)
        //     console.log(tickerPrice);
        // else ... need to enter a ticker id number
        .then(tickerPrice => console.log(tickerPrice))
    )