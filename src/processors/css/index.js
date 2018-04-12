import BaseProcessor from '../base-processor'
import { getImports, postcssProcess } from './postcss-helper'
import { splitKey } from '../../core/key-utils'
import injectStyle from './inject-style'

export default class CssProcessor extends BaseProcessor {
  async process (key, source, options = {}) {
    const { url } = splitKey(key)
    const imports = await getImports(url, source)

    this.registerDynamic(key, imports, true, (require, exports, module) => {
      exports.raw = source
      exports.getCompiledCss = async () => postcssProcess(url, source, options, require)

      exports.injectStyle = async () => {
        const compiledCss = await exports.getCompiledCss()
        injectStyle(compiledCss)
      }
    })
  }
}
