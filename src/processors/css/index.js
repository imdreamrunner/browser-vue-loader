import postcss from 'postcss'
import BaseProcessor from '../base-processor'
import { fetchContent } from '../../core/fetch-source'
import atImport from './postcss-plugins/at-import'
import scopeId from './postcss-plugins/scope-id'

/**
 * This plugin is to handle @import statement inside the CSS file.
 * @returns {object} the plugin
 */
const atImportPlugin = (processor) => {
  const resolver = async (key, base) => {
    console.log('resolve', key)
    if (key.indexOf('://') >= 0) {
      return key
    }
    return `${base}/${key}`
  }
  const instantiator = async (key) => {
    // first, check if the module to load is in our loader's registry.
    // if yes, directly return it.
    const loadedModule = processor.getModuleByKey(key)
    if (loadedModule) {
      return loadedModule.css
    }
    // otherwise, we fetch this module from the network.
    const source = await fetchContent(key)
    // and let the processor handle the file
    await processor.sendToRouter('css', key, source)
    return processor.getModuleByKey(key).css
    // TODO It's better if we could use the loader's import method to load the module.
  }
  return atImport({
    resolver,
    instantiator,
  })
}

export default class CssProcessor extends BaseProcessor {
  async process (key, source, options = {}) {
    const plugins = [
      atImportPlugin(this),
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
        const {type, file} = message
        console.log('msg', type, message)
      })
    }

    const compiledCss = compiled.css

    const injectStyle = () => {
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(compiledCss))
      document.head.appendChild(styleElement)
    }

    this.registerModuleNamespace(key, {injectStyle, css: compiledCss})
  }
}
