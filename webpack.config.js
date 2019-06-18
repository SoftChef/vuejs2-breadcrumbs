const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './src/Breadcrumbs.js',
    output: {
        path: path.resolve(`${__dirname}/dist`),
        filename: 'Breadcrumbs.js'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js|\.vue$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.styl(us)?$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `"${process.env.NODE_ENV}"`
            }
        })
    ]
}
