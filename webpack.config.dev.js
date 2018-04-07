const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const appHtmlTitle = 'Browser Vue Loader'

module.exports = merge(webpackConfig, {

  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  }

})
