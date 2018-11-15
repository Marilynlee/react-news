var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/index.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [["import", {"libraryName": "antd", "style": "css"}]],
                }
            },
            {
                test: /\.css?$/,
                include: [path.join(__dirname, '/node_modules/antd'),/src/],
                loader: 'style-loader!css-loader'
            },
            // {
            //     test: /\.css?$/,
            //     exclude: /(node_modules)/,
            //     loader: 'style-loader!css-loader'
            // },
            {
                test: /\.(eot|woff|woff2|ttf)/,
                loader: "url-loader?limit=30000&name=fonts/[hash:8].[name].[ext]"
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "./src/bundle.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
};
