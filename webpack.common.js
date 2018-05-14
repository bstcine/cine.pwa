const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const publicPath = '/'; // for cdn

const pages = ['content', 'cquiz', 'address', 'vocabtest', 'tgrammar', 'user'];

let entry = {};
let HtmlWebpackPlugins = [];

pages.forEach(page => {
    entry[page] = `./src/client/entry/${page}/index.js`;
    HtmlWebpackPlugins.push(
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
    plugins: [new CleanWebpackPlugin(['build']), ...HtmlWebpackPlugins],
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
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath,
                },
            },
            {
                test: /\.less$/,
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
                    'less-loader',
                ],
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
