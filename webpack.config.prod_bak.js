const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const BuildManifestPlugin = require('build-manifest-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const Config = require('./webpack.config');

const pages = Config.pages;
let entry = {};
let HtmlWebpackPlugins = [];
pages.forEach(page => {
    entry[page] = ['babel-polyfill', `./src/client/entry/${page}/index.js`];
    HtmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
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
        })
    );
});

module.exports = {
    cache: false,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: Config.output,
    module: Config.module,
    resolve: Config.resolve,
    plugins: [
        new webpack.EnvironmentPlugin({
            DEBUG: Config.debug,
            MODE: Config.MODE,
            API_Host_URL: Config.MODE === '' ? '' : Config.API_Host_URL,
        }),
        new CleanWebpackPlugin(['build/*.*', 'build/entry'], { verbose: false }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'build/dll/manifest-dll.json',
        }),
        ...HtmlWebpackPlugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/dll/dll.*.js'),
            publicPath: Config.publicPath + 'dll/',
            includeSourcemap: false,
            outputPath: 'dll',
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,

                comparisons: false,
                drop_console: true,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
            sourceMap: true,
        }),
        // new BuildManifestPlugin({
        //     name: 'build-manifest.json',
        //     buildPath: path.join(__dirname, 'build')
        // })
        // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
