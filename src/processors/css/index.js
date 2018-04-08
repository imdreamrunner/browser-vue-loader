import postcss from 'postcss'
// import atImport from 'postcss-import'
import BaseProcessor from '../base-processor'
import scopeId from './postcss-plugins/scope-id'

export default class CssProcessor extends BaseProcessor {
  async process(key, source, options) {
    const plugins = [
      // atImport({
      //   path: ["src/css"],
      // }),
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
      console.log('ex', ex)
      this.registerModuleNamespace(key, {default: () => {}})
    }
    if (compiled.messages) {
      compiled.messages.forEach(({ type, file }) => {
        console.log('msg', type, file)
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
