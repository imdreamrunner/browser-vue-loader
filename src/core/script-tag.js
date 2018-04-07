/**
 * This module exports a function {@link processScriptTag} that should be call
 * when the module is loaded by the browser.
 *
 * Parts of the code in this module is modified from
 * https://github.com/ModuleLoader/browser-es-module-loader/blob/master/src/browser-es-module-loader.js
 */

import {loader} from './core-loader'
import {generateUniqueUrl} from './unique'

const doProcessScriptTag = () => {
  document.removeEventListener('DOMContentLoaded', doProcessScriptTag, false)

  const scriptCollection = document.getElementsByTagName('script')
  const scripts = Array.prototype.slice.call( scriptCollection, 0 )
  scripts.filter(s => s.type === 'boom!').forEach(async script => {
    const content = script.innerHTML
    const key = generateUniqueUrl(document.location.href, 'js')
    await loader.router.routeTo('js', key, content)
    loader.import(key)
  })
}

export const processScriptTag = () => {
  if (document.readyState === 'complete') {
    doProcessScriptTag()
  } else {
    document.addEventListener('DOMContentLoaded', doProcessScriptTag, false)
  }
}
