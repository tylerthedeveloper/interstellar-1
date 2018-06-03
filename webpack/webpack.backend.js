const path = require('path');

const NodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const OUTPUT_PATH = path.resolve(__dirname, '../bin');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, '../server/index.js'),
    ],
    output: {
        path: OUTPUT_PATH,
        filename: 'server.js'
    },

    resolve: {
        extensions: ['.js']
    },

    devtool: 'eval',
    mode: 'development',
    watch: true,

    /***********************************************
     * Node.js Configuration Options
     ***********************************************/

    externals: [NodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    target: "node",
    node: {
        __dirname: true
    },


    /***********************************************
     * File Loaders
     ***********************************************/

    module: {
        rules: [

            //js
            {
                test: /\.(js)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },

        ]
    },

    /***********************************************
     * Plugins
     ***********************************************/

    optimization: {
        minimize: false
    },

    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

