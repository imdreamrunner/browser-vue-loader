module.exports = (config) => {
  config.set({

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      { pattern: 'dist/*.js', watched: true, served: true, included: false },
      { pattern: 'examples/**/*', watched: true, served: true, included: false },
      { pattern: 'tests/**/*-test.js', watched: true },
    ],

    frameworks: ['browserify', 'mocha'],

    preprocessors: {
      'tests/**/*-test.js': ['browserify'],
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          ignore: /node_modules/
        }],
      ],
      extensions: ['.jsx']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    },

    plugins: [
      require('karma-mocha'),
      require('karma-browserify'),
      require('karma-chrome-launcher'),
    ],

    browsers: ['Chrome'],
  })
}
