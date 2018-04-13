import BaseProcessor from '../base-processor'
import { postcssProcess } from './postcss-helper'
import { splitKey } from '../../core/key-utils'
import injectStyle from './inject-style'


export default class CssProcessor extends BaseProcessor {
  async process (key, source) {
    const { url, options = {} } = splitKey(key)

    let classNameMapping
    const classNameMappingCallback = map => classNameMapping = map
    const processed = await postcssProcess(url, source, options, this.importModule, classNameMappingCallback)

    this.registerDynamic(key, [], true, (require, exports, module) => {
      exports.raw = source
      exports.compiledCss = processed
      exports.classNameMapping = classNameMapping
      exports.injectStyle = () => injectStyle(processed)
    })
  }
}
