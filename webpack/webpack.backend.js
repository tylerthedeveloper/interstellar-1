const path = require('path');

const NodeExternals = require('webpack-node-externals');

const OUTPUT_PATH = path.resolve(__dirname, '../bin');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: path.resolve(__dirname, '../server/server.js'),
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

    externals: [NodeExternals()],
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
    }
};

