var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        filename: 'app.bundle.js',
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    devtool:'cheap-source-map'
};