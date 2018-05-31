const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    name: 'commons',
                    test: /src[\/]/,
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                },
                vendors: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'initial',
                    priority: 10,
                    minChunks: 2,
                },
            },
        },
        minimizer: [
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
        ],
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                isSafe: true,
            },
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
