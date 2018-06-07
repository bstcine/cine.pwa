const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const devMode = process.env.NODE_ENV !== 'production';
const vendors_name = devMode ? 'vendors' : 'vendors.min';

// 重要提示：vendors 只要变动 filename 就一定要修改，见下方 filename
const vendors = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-transition-group',
    'react-modal',
    'react-redux',
    'redux',
    'redux-thunk',
    'babel-polyfill',
];

module.exports = {
    mode: 'none',
    // devtool: 'cheap-module-source-map',
    entry: {
        vendors: vendors,
        vendors_min: vendors,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJSPlugin({
                include: /_min\.js$/,
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
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
                },
            }),
        ],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'dll/001.[name].js', // 重要提示：vendors 只要变动 filename 就一定要修改
        library: '[name]',
    },
    module: base.module,
    resolve: base.resolve,
    plugins: [
        // new CleanWebpackPlugin('build/*', { verbose: false }),
        new webpack.DllPlugin({
            path: 'build/dll/manifest-[name].json',
            name: '[name]',
        }),
        // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
