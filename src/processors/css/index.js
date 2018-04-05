import BaseProcessor from '../base-processor'
import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'

export default class CssProcessor extends BaseProcessor {
  process(key, source) {
    const injectStyle = () => {
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(source))
      document.head.appendChild(styleElement)
    }
    this.loader.registry.set(key, new ModuleNamespace({default: injectStyle}))
  }
}
