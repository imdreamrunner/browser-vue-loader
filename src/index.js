import 'babel-polyfill'
import { loadVue } from './core/core-loader'
import { processScriptTag } from './core/script-tag'

window.loadVue = loadVue
processScriptTag()

