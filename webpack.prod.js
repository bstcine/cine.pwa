const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const WebpackServiceWorkerPlugin = require('./plugins/webpackServiceWorkerPlugin');

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
            new UglifyJSPlugin({
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
        new WebpackServiceWorkerPlugin({
            name: 'sw-learn.js',
            path: path.join(__dirname, 'build'),
        }),
        new WebpackServiceWorkerPlugin({
            name: 'sw-widget.js',
            path: path.join(__dirname, 'build'),
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
