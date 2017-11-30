const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const pages = ['vocabtest']

let entry = {}
let plugins = []
pages.forEach((page)=>{
    entry[page] = ['babel-polyfill', `./src/page/${page}/entry.js`]
    plugins.push(new HtmlWebpackPlugin({
        filename:`${page}/page.html`,
        template:`src/page/${page}/page.html`,
        inject: true,
    }))
})


module.exports = {
    cache: true,
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: '[name]/entry.js'
    },
    externals: {},
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', "stage-0"]
            },
        },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-import'),
                                require('autoprefixer')
                            ],
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: 'assets/[name]-[hash:5].[ext]'
                }
            }]
    },
    resolve: {
        alias: {
            'common': path.resolve(__dirname, 'src/common'),
        }
    },
    stats: {
        colors: true
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     {from: 'src/dll', to: 'dll'}
        // ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'src/dll/manifest-dll.json'
        }),
        ...plugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname,'src/dll/dll.js'),
            includeSourcemap: false,
            outputPath:'dll'
        }),
    ]
};