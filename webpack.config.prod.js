const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const WebpackConfigCommon = require('./webpack.config.common');

const pages = WebpackConfigCommon.pages;
let entry = {};
let HtmlWebpackPlugins = [];
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/client/entry/${page}/index.js`];
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin({
        filename: `entry/${page}/index.html`,
        template: `src/client/entry/${page}/index.html`,
        inject: true,
        chunks: [page],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
    }))
});

module.exports = {
    cache: false,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: WebpackConfigCommon.output,
    module: WebpackConfigCommon.module,
    resolve: WebpackConfigCommon.resolve,
    plugins: [
        new webpack.DefinePlugin({
            'debug': JSON.stringify(WebpackConfigCommon.debug)
        }),
        new CleanWebpackPlugin(['build/*.*', 'build/entry', 'build/asset'], {verbose: false}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'build/dll/manifest-dll.json'
        }),
        ...HtmlWebpackPlugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/dll/dll.*.js'),
            publicPath: WebpackConfigCommon.static_host + 'dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebookincubator/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
                drop_console: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebookincubator/create-react-app/issues/2488
                ascii_only: true,
            },
            sourceMap: true,
        }),
        // new BundleAnalyzerPlugin({analyzerMode:'static'})
    ]
};