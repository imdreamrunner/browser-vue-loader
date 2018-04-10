// We need to use require statement here to conditionally load the babel module.
// import() is async so cannot be used here.
if (!window._babelPolyfill) {
  require('babel-polyfill')
}
