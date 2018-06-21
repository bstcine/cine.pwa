const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
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
            new UglifyJSPlugin({
                cache: false,
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
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
});
