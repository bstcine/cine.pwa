var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    // devtool: "eval",
    entry: {
        // "index": './src/webapp/index.js',
        //"admin": './src/webapp/admin.js',
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
            include:path.resolve(__dirname, 'src'),
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react', "stage-0"]
            }
        }]
    },
      resolve:{
        alias:{
            'component':path.resolve(__dirname, 'src/webapp/component'),
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