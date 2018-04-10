import { loadVue } from './core/core-loader'
import { processScriptTag } from './core/script-tag'
if (!window._babelPolyfill) {
  import('babel-polyfill')
}

window.loadVue = loadVue
processScriptTag()
