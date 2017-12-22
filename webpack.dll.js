const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackConfigCommon = require('./webpack.config.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let plugins = []
process.env.NODE_ENV === 'production' && plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = {
    cache: false,
    entry: {
        dll: WebpackConfigCommon.vendor_dll
    },
    output: {
        path: path.resolve(__dirname, './src/client/dll'),
        filename: '[name].[chunkhash:8].js',
        library: '[name]'// 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    },
    //todo 单独打包第三方css/less
    plugins: [
        new CleanWebpackPlugin(['src/client/dll/*']),
        new webpack.DllPlugin({
            path: 'src/client/dll/manifest-dll.json',// 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
            name: '[name]',// 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
        }),
        ...plugins,
        // new BundleAnalyzerPlugin({analyzerMode:'static'})
    ]
};