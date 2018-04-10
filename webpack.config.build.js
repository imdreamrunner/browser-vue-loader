const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpackConfig = require('./webpack.config')

module.exports = merge(webpackConfig, {

  // devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: false, // build process will be very slow if enable this.
          mangle: false,
          output: {
            comments: false
          }
        }
      })
    ]
  }

})
