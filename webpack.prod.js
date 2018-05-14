const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'entry/[name]/index.[contenthash:8].css',
        }),
        new LodashModuleReplacementPlugin(),
        new UglifyJSPlugin({
            uglifyOptions: {
                cache: true,
                parallel: true,
                sourceMap: true,
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
        new OptimizeCSSAssetsPlugin(),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
