const merge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');
const commonConfig = require('./common');
const configOptions = require('../config/dev.json');

module.exports = merge(commonConfig, {

    mode: 'development',
    devtool: "source-map",
    output: {
        publicPath: configOptions.staticURL,
    },


    /***********************************************
     * Additional Plugins
     ***********************************************/

    optimization: {
        minimize: false
    },

    plugins: [
        new WriteFilePlugin()
    ]
});