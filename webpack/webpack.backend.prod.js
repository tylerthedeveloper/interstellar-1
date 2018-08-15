const path = require('path');

const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require("start-server-webpack-plugin");

const webpack = require('webpack');

const OUTPUT_PATH = path.resolve(__dirname, '../build');

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
        extensions: ['.mjs', '.js', '.jsx'],
        alias: {
            graphql: path.resolve(__dirname, '../node_modules/graphql'),
        }
    },
    mode: 'production',

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
            {
                test: /\.node$/,
                use: 'node-loader'
            },

            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            "@babel/env",
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            ["module-resolver", {
                                "alias": {
                                    "graphile_build": path.resolve(__dirname, '../../graphile-build'),
                                }
                            }]
                        ]
                    }
                }
            },

            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },


        ]
    },

    /***********************************************
     * Plugins
     ***********************************************/

    optimization: {
        minimize: true
    },

    plugins : [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('production')
            }
        }),
        new webpack.HotModuleReplacementPlugin()

    ]
};

