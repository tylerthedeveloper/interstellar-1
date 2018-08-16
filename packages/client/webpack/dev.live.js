const merge = require('webpack-merge');
const webpack = require('webpack');

const devConfig = require('./dev');
const configOptions = require('../config/dev.json');

module.exports = merge(devConfig, {

    /***********************************************
     * Dev Server Config Options
     ***********************************************/
    entry: [
        `webpack-dev-server/client?${configOptions.staticURL}`,
        'webpack/hot/only-dev-server',
    ],

    devServer: {
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
        hot: true
    },

    watch: true,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]

});