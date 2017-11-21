var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    // devtool: "eval",
    entry: {
        "word": './src/webapp/word.js',
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'rea.[name].bundle.js'
    },
    externals: {
        //'react': 'React',
        //'react-dom': 'ReactDOM'
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
            test:/\.(png|jpg|jpeg|gif|svg)$/i,
            loader:'url-loader',
            options:{
                limit:20000,
                name:'assets/[name]-[hash:5].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            'component': path.resolve(__dirname, 'src/webapp/component'),
        }
    },
    stats: {
        colors: true
    },
    //devtool: 'eval',
    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./www/dll/manifest-vendor-dll.json')
        })
    ]
};