const path = require('path')
const webpack = require('webpack')

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev')

const dirNode = 'node_modules'
const dirSource = path.join(__dirname, 'src')

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    'browser-vue-loader': path.join(dirSource, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirSource
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  module: {
    rules: [
      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },
      // BABEL
      {
        test: /\.txt/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  }
}
