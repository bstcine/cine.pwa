const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Config = require('./webpack.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

module.exports = {
    cache: false,
    entry: {
        dll: Config.vendors,
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'dll/[name].vendor.[chunkhash:8].js', // 1632: React Version, 400: Redux Version
        library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    module: Config.module,
    resolve: Config.resolve,
    // todo 单独打包第三方css/less
    plugins: [
        new CleanWebpackPlugin('build/*', { verbose: false }),
        new webpack.DllPlugin({
            path: 'build/dll/manifest-dll.json', // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    ],
};
