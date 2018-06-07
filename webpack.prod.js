const base = require('./webpack.base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    mode: base.mode,
    entry: base.entry,
    output: base.output,
    resolve: base.resolve,
    module: base.module,
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    test: /src[\/].+\.js$/,
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                },
            },
        },
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
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
    plugins: [
        new LodashModuleReplacementPlugin(),
        ...base.plugins,
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                isSafe: true,
            },
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
