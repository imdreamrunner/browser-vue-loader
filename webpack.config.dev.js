const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {

  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/dist',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }

})
