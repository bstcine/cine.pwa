const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const devMode = process.env.NODE_ENV !== 'production';

// 默认无需配置，需要指定 a.bstcine.com 下访问 b.bstcine.com 的时候才需要指定
const SERVICE_URL = null;
const publicPath = '/'; // for cdn
const pages = [
    'content',
    'cquiz',
    'address',
    'vocabtest',
    'tgrammar',
    'user',
    'teacher',
    'temp',
];

let entry = {};
let htmlWebpackPlugins = [];

pages.forEach(page => {
    entry[page] = `./src/client/entry/${page}/index.js`;
    htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
            filename: `entry/${page}/index.html`,
            template: `src/client/entry/${page}/index.html`,
            chunks: [page],
        })
    );
});

module.exports = {
    entry,
    output: {
        filename: devMode
            ? 'entry/[name]/index.[hash:8].js'
            : 'entry/[name]/index.[chunkhash:8].js',
        path: path.resolve(__dirname, 'build'),
        publicPath,
    },
    plugins: [
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify(SERVICE_URL),
        }),
        new CleanWebpackPlugin(['build'], { verbose: devMode }),
        new MiniCssExtractPlugin({
            filename: 'entry/[name]/index.[chunkhash:8].css',
        }),
        ...htmlWebpackPlugins,
    ],
    resolve: {
        modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src/client'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !devMode,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                    'less-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer'),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath,
                },
            },
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'asset/font/[name].[hash:8].[ext]',
                    publicPath,
                },
            },
        ],
    },
};
