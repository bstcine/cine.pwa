const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackConfigCommon = require('./webpack.config.common')

const pages = WebpackConfigCommon.pages
let entry = {}
let plugins = []
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/page/${page}/entry.js`]
    plugins.push(new HtmlWebpackPlugin({
        filename: `${page}/index.html`,//入口文件不设置hash，禁止长期缓存
        template: `src/page/${page}/index.html`,
        inject: true,
    }))
})

module.exports = {
    cache: true,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: WebpackConfigCommon.output,
    module: WebpackConfigCommon.module,
    resolve: WebpackConfigCommon.resolve,
    plugins: [
        new CleanWebpackPlugin(['build/*'], {dry: false, verbose: true, watch: true}),
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
    ]
}