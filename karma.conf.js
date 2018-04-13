module.exports = (config) => {
  const customConfig = {
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/jquery/dist/jquery.js',
      { pattern: 'dist/*.js', watched: true, served: true, included: false },
      { pattern: 'examples/**/*', watched: true, served: true, included: false },
      { pattern: 'tests/**/*-test.js', watched: true }
    ],

    reporters: ['spec'],

    frameworks: ['browserify', 'mocha', 'iframes'],

    preprocessors: {
      'tests/**/*-test.js': ['browserify', 'iframes']
    },

    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          ignore: /node_modules/
        }]
      ],
      extensions: ['.jsx']
    },

    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      sourceFileName: function (file) {
        return file.originalPath
      }
    },

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    plugins: [
      require('karma-mocha'),
      require('karma-browserify'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-iframes')
    ],

    browsers: ['Chrome']
  }

  if (process.env.TRAVIS || process.env.HEDLESS) {
    customConfig.browsers = ['ChromeHeadlessNoSandbox']
  }

  config.set(customConfig)
}
