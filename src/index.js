import 'babel-polyfill'
import loadVue from './core/core-loader'

const isStrict = (function() { return !this; })()

if (isStrict) {
  console.warn('Strict mode is on. Vue template render function requires strict mode to be turned off.')
}

window.loadVue = loadVue

