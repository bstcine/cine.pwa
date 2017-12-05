const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackConfigCommon = require('./webpack.config.common')

const pages = WebpackConfigCommon.pages
let entry = {}
let plugins = []
let rewrites = []
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/page/${page}/entry.js`]
    plugins.push(new HtmlWebpackPlugin({
        filename: `${page}/index.html`,
        template: `src/page/${page}/index.html`,
        inject: true,
    }))
    rewrites.push({from: new RegExp(`^/${page}.*`), to: `/${page}/index.html`})
})

module.exports = {
    cache: true,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: WebpackConfigCommon.output,
    module: WebpackConfigCommon.module,
    resolve: WebpackConfigCommon.resolve,
    plugins: [
        new CleanWebpackPlugin(['build/*']),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'src/dll/manifest-dll.json'
        }),
        ...plugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'src/dll/dll.*.js'),
            publicPath: '/dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        historyApiFallback:{
            rewrites: rewrites
        },
        inline:true,
        port: 5000,
        proxy: {
            "/api": "http://localhost:9000"
        }
    }
}