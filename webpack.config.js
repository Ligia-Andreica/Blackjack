const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'build')
const APP_DIR = path.resolve(__dirname, 'src')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

const config = {
    entry: APP_DIR + '/index.js',
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets : ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.scss$/,
                include: APP_DIR,
                loaders: "style-loader!css-loader"
            },
            {
                test: /\.spec.jsx?/,
                include: APP_DIR,
                loader: ['babel-loader', 'mocha-loader']
            },
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: ['babel-loader', 'eslint-loader']
            },
            {
                test: /sinon.js$/,
                use: [
                    {
                        loader: 'import-loader',
                        options: {
                            'define=>false': ''
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [HtmlWebpackPluginConfig],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 3000,
        host: '0.0.0.0'
    },
}

module.exports = config