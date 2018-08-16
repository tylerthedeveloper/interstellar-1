const PriceFinder = require('./usdPriceFinder');

let cache;
const intervalTimer = 300000;

/**************************************************
 * Cache Updates
 **************************************************/

// uses helpers to get averages of all selected asssets
//TODO replace with redis cache
function updateCache() {
    return PriceFinder.getAverageUSDPrices().then(usdDict => {
        cache = usdDict;
        console.log('filled cache');
    });
}

//starts and stops the updates
let timer;
function beginUpdating() {
    if(!timer) {
        updateCache();
        timer = setInterval(updateCache, intervalTimer)
    }
}
function stopUpdating() {
    if(timer) clearInterval(timer);
}


/**************************************************
 * Cache Reads
 **************************************************/

// returns a promise for the json representation of the current price list
const getPrices = () => {
    return Promise.resolve(cache);
};

module.exports = {
    init: updateCache,
    getPrices,
    beginUpdating,
    stopUpdating
};