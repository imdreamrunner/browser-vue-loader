const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackConfig = require('./webpack.config')
const appHtmlTitle = 'Browser Vue Loader'

module.exports = merge(webpackConfig, {

  devtool: 'eval',

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'test-assets/index.ejs'),
      title: appHtmlTitle
    })
  ],

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  }

})
