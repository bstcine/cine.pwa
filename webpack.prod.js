const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const WPTerserPlugin = require('terser-webpack-plugin');
const WPOptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackServiceWorkerPlugin = require('./plugins/webpackServiceWorkerPlugin');
const WPLodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const WPBundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const entrys = Object.keys(common.entry);
module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: (module, chunks) => {
                        // 所有 entry 均包含的公共组件
                        const names = chunks.map(c => c.name).filter(Boolean);
                        return (
                            entrys.length &&
                            entrys.every(entry =>
                                names.some(name => name === entry)
                            )
                        );
                    },
                    chunks: 'initial',
                    priority: 10,
                    minChunks: 2,
                },
            },
        },
        minimizer: [
            new WPTerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    compress: {
                        warnings: false,
                        comparisons: false,
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
            new WPOptimizeCSSAssetsPlugin({}),
        ],
    },
    plugins: [
        new WPLodashModuleReplacementPlugin(),
        new WebpackServiceWorkerPlugin({
            name: 'sw-learn.js',
            path: path.join(__dirname, 'build'),
        }),
        new WPBundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
