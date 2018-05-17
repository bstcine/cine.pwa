const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const API_Host_URL = 'http://apptest.bstcine.com';

let rewrites = [];
for (let entry in common.entry) {
    if (common.entry.hasOwnProperty(entry)) {
        rewrites.push({
            from: new RegExp(`^/${entry}.*`),
            to: `/entry/${entry}/index.html`,
        });
    }
}
rewrites.push({ from: /.*/, to: `/entry/content/index.html` });

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites,
        },
        port: 5000,
        disableHostCheck: true,
        host: '0.0.0.0',
        useLocalIp: true,
        proxy: {
            '/api': {
                target: API_Host_URL,
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
