const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, '../build/dist');
const HTML_ENTRY = path.resolve(__dirname, '../static/index.html');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: [
        path.resolve(__dirname, '../src/index.tsx')
    ],
    output: {
        path: OUTPUT_PATH,
        filename: 'bundle.js',
        publicPath: 'http://interstellar.market/',
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
        },
        symlinks: false
    },
    devtool: 'none',
    mode: 'production',
    target: 'web',


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
            template: HTML_ENTRY,
            minify: true,

        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify("production")
            }
        })

    ]
};

