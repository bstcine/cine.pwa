const path = require('path')
// 生产模式配置好 CDN 后切换到 CDN
const static_host = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {

    // 用来加载 vConsole 调试插件，生产模式 关闭 debug
    debug: true,

    static_host,

    pages: ['content', 'cquiz', 'address', 'vocabtest'],

    vendor_dll: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-transition-group',
        'babel-polyfill',
        'store',
        'react-modal',
        'material-icons',
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: static_host,
        filename: 'entry/[name]/index.[chunkhash:8].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                query: {
                    cacheDirectory: true,
                    plugins: ['lodash'],
                    presets: ["env", "stage-0", "react"]
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
                test: /\.css$/,
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
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'asset/image/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'asset/font/[name].[hash:8].[ext]'
                },
            }
        ]
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src/client'), "node_modules"],
        alias: {
            '@': path.resolve(__dirname, 'src/client'),
            'material-icons': 'material-design-icons/iconfont/material-icons.css',
            'store': 'store/dist/store.modern',
        }
    }
}