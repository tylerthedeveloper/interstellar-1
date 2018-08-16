const merge = require('webpack-merge');
const commonConfig = require('./common');
const configOptions = require('../config/prod.json');

module.exports = merge(commonConfig, {

    mode: 'production',
    devtool: "none",
    output: {
        publicPath: configOptions.staticURL,
    },


    /***********************************************
     * Additional Plugins
     ***********************************************/

    optimization: {
        minimize: true
    },
});