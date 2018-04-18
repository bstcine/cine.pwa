const path = require('path');

// 本地静态文件模式: MODE = 'static', Http模式: MODE = ''
const MODE = '';
const API_Host_URL = 'http://apptest.bstcine.com';


let publicPath = MODE === 'static' ? '../../' : '/';

module.exports = {
    // 用来加载 vConsole 调试插件，生产模式 关闭 debug
    debug: true,

    MODE,

    API_Host_URL,

    publicPath,

    pages: ['content', 'cquiz', 'address', 'vocabtest','tgrammar'],

    vendors: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-transition-group',
        'react-modal',
        // 'material-icons',
        'babel-polyfill'
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: publicPath,
        filename: 'entry/[name]/index.[chunkhash:8].js',
        chunkFilename: 'entry/[name].[chunkhash:4].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'node_modules'),
                options: {
                    cacheDirectory: true,
                    plugins: ['lodash'],
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('postcss-import'), require('autoprefixer')],
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9' // React doesn't support IE8 anyway
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
                            plugins: [require('postcss-import'), require('autoprefixer')],
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9' // React doesn't support IE8 anyway
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
                    name: 'asset/image/[name].[hash:8].[ext]',
                    publicPath
                }
            },
            {
                test: /\.(woff|woff2|eot|otf|webp|ttf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'asset/font/[name].[hash:8].[ext]',
                    publicPath
                }
            }
        ]
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src/client'), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, 'src/client'),
            'material-icons': 'material-design-icons/iconfont/material-icons.css'
        }
    }
};
