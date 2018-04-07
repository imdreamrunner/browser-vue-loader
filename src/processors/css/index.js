import BaseProcessor from '../base-processor'

export default class CssProcessor extends BaseProcessor {
  process(key, source) {
    const injectStyle = () => {
      const styleElement = document.createElement('style')
      styleElement.appendChild(document.createTextNode(source))
      document.head.appendChild(styleElement)
    }
    this.registerModuleNamespace(key, {default: injectStyle})
  }
}
