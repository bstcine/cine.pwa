const path = require('path')
// 生产模式配置好 CDN 后切换到 CDN
const static_host = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {

    static_host,

    pages: ['vocabtest'],

    vendor_dll: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-transition-group',
        'lodash',
        'store'
    ],

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: static_host,
        filename: '[name]/entry.[chunkhash:8].js'
    },

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
                    name: 'asset/image/[name].[hash:8].[ext]'
                }
            }]
    },

    resolve: {
        alias: {
            'common': path.resolve(__dirname, 'src/common'),
        }
    }
}