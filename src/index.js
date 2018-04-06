import 'babel-polyfill'
import { loadVue, loader } from './core/core-loader'

const isVueDefined = !! window.Vue

if (isVueDefined) {
  window.loadVue = loadVue
} else {
  console.warn('Vue is not found in global variables. Please ensure it is correctly loaded.')
}

const processScriptTag = () => {
  document.removeEventListener('DOMContentLoaded', processScriptTag, false)

  const scriptCollection = document.getElementsByTagName('script')
  const scripts = Array.prototype.slice.call( scriptCollection, 0 )
  scripts.filter(s => s.type === 'boom!').forEach(async script => {
    const content = script.innerHTML
    const key = `${document.location.href}random.js`
    await loader.router.routeTo('js', key, content)
    loader.import(key)
  })
}

// simple DOM ready
if (document.readyState === 'complete') {
  processScriptTag()
} else {
  document.addEventListener('DOMContentLoaded', processScriptTag, false)
}
