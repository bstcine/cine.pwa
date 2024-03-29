const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const Dev_Host_URL = 'https://www.bstcine.com';
// const Dev_Host_URL = 'http://localhost:9000';
console.log(`API connected ${Dev_Host_URL}`);

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
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
            rewrites,
        },
        port: 5001,
        disableHostCheck: true,
        host: '0.0.0.0',
        useLocalIp: true,
        proxy: {
            '/api': {
                target: Dev_Host_URL,
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
