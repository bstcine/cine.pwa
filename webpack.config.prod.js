const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackConfigCommon = require('./webpack.config.common')

const pages = WebpackConfigCommon.pages
let entry = {}
let plugins = []
pages.forEach((page) => {
    entry[page] = ['babel-polyfill', `./src/page/${page}/entry.js`]
    plugins.push(new HtmlWebpackPlugin({
        filename: `${page}/index.html`,
        template: `src/page/${page}/index.html`,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
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
                    limit: 10000,
                    name: 'asset/image/[name]-[hash:5].[ext]'
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
        new CleanWebpackPlugin(['build/*'], {dry: false, verbose: true, watch: true}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: 'src/dll/manifest-dll.json'
        }),
        ...plugins,
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'src/dll/dll.js'),
            publicPath:'/dll/',
            includeSourcemap: false,
            outputPath: 'dll'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                // Disabled because of an issue with Uglify breaking seemingly valid code:
                // https://github.com/facebookincubator/create-react-app/issues/2376
                // Pending further investigation:
                // https://github.com/mishoo/UglifyJS2/issues/2011
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebookincubator/create-react-app/issues/2488
                ascii_only: true,
            },
            sourceMap: true,
        }),
    ]
}