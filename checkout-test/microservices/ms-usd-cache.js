const usdResolvers = require('../usd-resolvers.js') // USD util functions

const intervalTimer = 300000; // 5 minutes

// this represents the cache
let _usdCache = {};

function getAverageUsdPrices() {
    usdResolvers.getAverageUsdPrices()
        .then(res => 
            // fillCache(res)
            // this is set here for now for local testing
            _usdCache = res
        );
}

// this will handle the return result of getAverageUsdPrices()
// and fill the cache accordingly
function fillCache(usdDict) {
    // fill redis cache with dict
}

// this will simply return (json?) representation of the current cache 
function getCache() {
    const usdCache = require('./temp-usd-cache').usdCache; // pull from local for testing 
    return Promise.resolve(usdCache);
}

// this is just the interval function to be called
function onIntervalUpdateCache() {
    setInterval(() => getAverageUsdPrices(), intervalTimer)
}

// onIntervalUpdateCache();


module.exports = {
    getCache    
}
