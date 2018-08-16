const path = require('path');

const NodeExternals = require('webpack-node-externals');


const webpack = require('webpack');

const OUTPUT_PATH = path.resolve(__dirname, '../bin');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: [
        path.resolve(__dirname, '../src/index.js'),
    ],
    output: {
        path: OUTPUT_PATH,
        filename: 'server.js'
    },

    resolve: {
        extensions: ['.mjs', '.js', '.jsx'],
    },


    /***********************************************
     * Node.js Configuration Options
     ***********************************************/

    externals: [
        NodeExternals(),
        NodeExternals({
            modulesDir: path.resolve(__dirname, "../../../node_modules")
        }
    )],
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
                use: {
                    loader: 'node-loader',
                },

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

    plugins : [
        new webpack.SourceMapDevToolPlugin({
            include: "node_modules/postgraphile"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server')
            }
        })
    ]
};

