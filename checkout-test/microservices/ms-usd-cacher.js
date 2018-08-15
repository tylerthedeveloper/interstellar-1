// express stuff
const express = require('express')
const app = express()

const usdResolvers = require('../helpers/usd-resolvers.js')
const intervalTimer = 300000; // 5 minutes
const usdCacherPort = require('./ms-ports').usdCacherPort;

// uses helpers to get averages of all selected asssets
const getAverageUsdPrices = () => {
    return usdResolvers.getAverageUsdPrices()
        .then(res => {
            // fillCache(res);
            return res;
        });
}

// this will handle the return result of getAverageUsdPrices() and fill the cache accordingly
const fillCache = (usdDict) => {
    // fill redis cache with dict
    // console.log('filled cache');
}

// this will simply return (json?) representation of the current cache 
const getCache = () => {
    const usdCache = require('./temp-usd-cache').usdCache; // pull from local for testing 
    return Promise.resolve(usdCache);
}

// this is just the interval function to be called
const onIntervalUpdateCache = () => {
    setInterval(() => getAverageUsdPrices(), intervalTimer)
}

// TODO: ONLY RETURN REQUESTED ASSETS
app.get('/averages', function (req, res) {
    getAverageUsdPrices()
        .then(averages => res.send(averages));
})

app.listen(usdCacherPort, () => console.log(`Example app listening on port ${usdCacherPort}`))

module.exports = {
    getCache
}