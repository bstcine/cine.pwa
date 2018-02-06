const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const WebpackMildCompile = require('webpack-mild-compile').Plugin;
const Config = require('./config');
const OfflinePlugin = require('offline-plugin');
const BuildManifestPlugin = require('build-manifest-webpack-plugin');

const pages = Config.pages;
let entry = {};
let HtmlWebpackPlugins = [];
let rewrites = [];
pages.forEach(page => {
    entry[page] = ['babel-polyfill', `./src/client/entry/${page}/index.js`];
    HtmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
            filename: `entry/${page}/index.html`,
            template: `src/client/entry/${page}/index.html`,
            inject: true,
            chunks: [page]
        })
    );
    rewrites.push({from: new RegExp(`^/${page}.*`), to: `/entry/${page}/index.html`});
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
            API_Host_URL: Config.API_Host_URL
        }),
        new WebpackMildCompile(),
        new CleanWebpackPlugin(['build/*.*', 'build/entry'], {verbose: false}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'build/dll/manifest-dll.json'
        }),
        ...HtmlWebpackPlugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/dll/dll.*.js'),
            publicPath: Config.publicPath + 'dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
        new LodashModuleReplacementPlugin(),
        new BuildManifestPlugin({
            name: 'build-manifest.json',
            buildPath: path.join(__dirname, 'build')
        })
        // new OfflinePlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites: rewrites
        },
        inline: true,
        port: 5000,
        disableHostCheck: true,
        // host: "0.0.0.0",
        // useLocalIp:true,
        proxy: {
            '/api': {
                // target: "http://localhost:9000",
                target: 'http://apptest.bstcine.com',
                secure: false,
                changeOrigin: true
            }
        }
    }
};
