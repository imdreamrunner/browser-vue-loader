import BaseProcessor from '../base-processor'
import { postcssProcess } from './postcss-helper'
import { splitKey } from '../../core/key-utils'
import injectStyle from './inject-style'

export default class CssProcessor extends BaseProcessor {
  async process (key, source) {
    const { url, options = {} } = splitKey(key)

    let classNameMapping = null
    const classNameMappingCallback = map => {
      classNameMapping = map
    }

    // The postcss processing is asynchronous. Because of this reason we have to
    // import the dependent module before we start `registerDynamic`
    const processed = await postcssProcess(url, source, options, this.importModule, classNameMappingCallback)

    if (options.module && classNameMapping === null) {
      throw new Error('classNameMapping')
    }

    this.registerDynamic(key, [], true, (require, exports, module) => {
      exports.raw = source
      exports.compiledCss = processed
      exports.classNameMapping = classNameMapping
      exports.injectStyle = () => injectStyle(processed)
    })
  }
}
