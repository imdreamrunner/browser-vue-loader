import 'babel-polyfill'
import { loadVue } from './core/core-loader'
import { processScriptTag } from './core/script-tag'

const isVueDefined = !! window.Vue

if (isVueDefined) {
  window.loadVue = loadVue
} else {
  console.warn('Vue is not found in global variables. Please ensure it is correctly loaded.')
}

processScriptTag()
