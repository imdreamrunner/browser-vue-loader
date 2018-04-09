import postcss from 'postcss'
import BaseProcessor from '../base-processor'
import atImport from './postcss-plugins/at-import'
import scopeId from './postcss-plugins/scope-id'

export default class CssProcessor extends BaseProcessor {
  async process(key, source, options = {}) {
    const resolver = async (key, base) => {
      console.log('resolve', key)
      if (key.indexOf('://') >= 0) {
        return key
      }
      return `${base}/${key}`
    }
    const instantiator = async (key) => {
      const loadedModule = this.getModuleByKey(key)
      if (loadedModule) {
        console.log('load cached module')
        return loadedModule.css
      }
      const response = await fetch(key)
      const source = await response.text()
      await this.sendToRouter('css', key, source)
      return this.getModuleByKey(key).css
    }

    const plugins = [
      atImport({
        resolver,
        instantiator,
      }),
    ]
    if (options.scoped) {
      plugins.push(scopeId({id: options.moduleId}))
    }

    const postcssOptions = {
      from: key,
      to: key,
    }

    let compiled
    try {
      compiled = await postcss(plugins).process(source, postcssOptions)
    } catch (ex) {
      console.warn(`Error when processing CSS ${key}`, ex)
      console.log(ex.stack)
      await this.registerModuleNamespace(key, {default: () => {}})
      return
    }
    if (compiled.messages) {
      compiled.messages.forEach(message => {
        const { type, file }= message
        console.log('msg', type, message)
      })
    }

    const compiledCss = compiled.css

    const injectStyle = () => {
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(compiledCss))
      document.head.appendChild(styleElement)
    }

    this.registerModuleNamespace(key, { injectStyle, css: compiledCss })
  }
}
