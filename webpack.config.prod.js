const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BuildManifestPlugin = require('build-manifest-webpack-plugin');

const Config = require('./config');

const pages = Config.pages;
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

entry['vendor'] = Config.vendors

module.exports = {
    cache: false,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: Config.output,
    module: Config.module,
    resolve: Config.resolve,
    plugins: [
        new webpack.EnvironmentPlugin({
            DEBUG: Config.debug
        }),
        new CleanWebpackPlugin(['build'], {verbose: false}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        ...HtmlWebpackPlugins,
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
        new BuildManifestPlugin({
            name:"build-manifest.json",
            buildPath:path.join(__dirname, "build"),
        }),
        new BundleAnalyzerPlugin({analyzerMode:'static'})
    ]
};