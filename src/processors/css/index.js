import postcss from 'postcss'
import BaseProcessor from '../base-processor'
import atImport from './postcss-plugins/at-import'
import scopeId from './postcss-plugins/scope-id'

export default class CssProcessor extends BaseProcessor {
  async process(key, source, options) {
    const plugins = [
      atImport({
        path: ["src/css"],
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
      console.log('Error when processing CSS', ex)
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

    this.registerModuleNamespace(key, {default: injectStyle})
  }
}
