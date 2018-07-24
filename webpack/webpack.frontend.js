const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, '../dist');
const HTML_ENTRY = path.resolve(__dirname, '../static/index.html');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.tsx')
    ],
    output: {
        path: OUTPUT_PATH,
        filename: 'bundle.js',
        publicPath: 'http://localhost:3001/',
    },

    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
        alias : {
            Stores: path.resolve(__dirname, '../src/stores/'),
            Pages: path.resolve(__dirname, '../src/pages/'),
            Structural: path.resolve(__dirname, '../src/structural/'),
            GQLTypes: path.resolve(__dirname, '../src/types/gqlTypes'),
            Types: path.resolve(__dirname, '../src/types/'),
            TypeUtil: path.resolve(__dirname, '../src/types/util'),
            Query: path.resolve(__dirname, '../src/api/gql/queries'),
            Mutation: path.resolve(__dirname, '../src/api/gql/mutations')
        }
    },
    devtool: 'source-map',
    mode: 'development',
    watch: true,
    target: 'web',


    /***********************************************
     * Dev Server Config Options
     ***********************************************/

    devServer: {
        host: 'localhost',
        port: 3001,
        historyApiFallback: true,
        hot: true
    },


    /***********************************************
     * File Loaders
     ***********************************************/

    module: {
        rules: [

            //js
            {
                test: /\.(jsx|js|ts|tsx)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        presets: [
                            "@babel/typescript",
                            "@babel/react"
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "transform-decorators-legacy",
                            "transform-class-properties",
                            "react-hot-loader/babel"

                        ]
                    }
                }
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },

            //images and fonts
            {
                test: /\.(woff|woff2|ttf|eot|jpe?g|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
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

    plugins: [

        //configuration plguins
        new HtmlWebpackPlugin({
            template: HTML_ENTRY
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("client")
            }
        })

    ]
};

