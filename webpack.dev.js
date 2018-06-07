const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base.js');

const Dev_Host_URL = 'http://apptest.bstcine.com';

let rewrites = [];
for (let entry in base.entry) {
    if (base.entry.hasOwnProperty(entry)) {
        rewrites.push({
            from: new RegExp(`^/${entry}.*`),
            to: `/entry/${entry}/index.html`,
        });
    }
}
rewrites.push({ from: /.*/, to: `/entry/content/index.html` });

module.exports = {
    mode: base.mode,
    devtool: 'cheap-module-source-map',
    entry: base.entry,
    output: base.output,
    resolve: base.resolve,
    module: base.module,
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
                target: Dev_Host_URL,
                secure: false,
                changeOrigin: true,
            },
        },
    },
    plugins: [...base.plugins, new webpack.HotModuleReplacementPlugin()],
};
