const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const WebpackConfigCommon = require('./webpack.config.common')

const pages = WebpackConfigCommon.pages
let entry = {}
let HtmlWebpackPlugins = []
let rewrites = []
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/page/${page}/entry.js`]
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `${page}/index.html`,
        template: `src/page/${page}/index.html`,
        inject: true,
        chunks: [page]
    }))
    rewrites.push({from: new RegExp(`^/${page}.*`), to: `/${page}/index.html`})
})

module.exports = {
    cache: false,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: WebpackConfigCommon.output,
    module: WebpackConfigCommon.module,
    resolve: WebpackConfigCommon.resolve,
    plugins: [
        new WebpackMildCompile(),
        new CleanWebpackPlugin(['build/*']),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'src/dll/manifest-dll.json'
        }),
        ...HtmlWebpackPlugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'src/dll/dll.*.js'),
            publicPath: '/dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
        new LodashModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        historyApiFallback:{
            disableDotRule: true,
            rewrites: rewrites
        },
        inline:true,
        port: 5000,
        proxy: {
            "/api": "http://localhost:9000"
        }
    }
}