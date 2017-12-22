const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const WebpackConfigCommon = require('./webpack.config.common');

const pages = WebpackConfigCommon.pages;
let entry = {};
let HtmlWebpackPlugins = [];
let rewrites = [];
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/client/entry/${page}/index.js`];
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `entry/${page}/index.html`,
        template: `src/client/entry/${page}/index.html`,
        inject: true,
        chunks: [page]
    }));
    rewrites.push({from: new RegExp(`^/${page}.*`), to: `/entry/${page}/index.html`})
});

module.exports = {
    cache: false,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: WebpackConfigCommon.output,
    module: WebpackConfigCommon.module,
    resolve: WebpackConfigCommon.resolve,
    plugins: [
        new WebpackMildCompile(),
        new CleanWebpackPlugin(['build/*.*', 'build/entry', 'build/asset'], {verbose: false}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'build/dll/manifest-dll.json'
        }),
        ...HtmlWebpackPlugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/dll/dll.*.js'),
            publicPath: '/dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
        new LodashModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites: rewrites
        },
        inline: true,
        port: 5000,
        proxy: {
            "/api": {
                target: "http://localhost:9000",
                // target: "http://apptest.bstcine.com",
                secure: false,
                changeOrigin: true
            }
        }
    }
};