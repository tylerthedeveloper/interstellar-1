const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, '../dist');
const HTML_ENTRY = path.resolve(__dirname, '../static/index.html');

module.exports = {


    /***********************************************
     * Generic Configuration Options
     ***********************************************/


    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, '../src/index.jsx')
    ],
    output: {
        path: OUTPUT_PATH,
        filename: 'bundle.js',
        publicPath: 'http://localhost:3001/',
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'eval',
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
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
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

        //css plugins
        new ExtractTextPlugin("styles.css"),
        new PurifyCSSPlugin({
                paths: glob.sync(path.resolve(__dirname, '../src/**/*.jsx')),
            }
        ),
        new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            }
        ),


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

