import { compileToFunctions } from 'vue-template-compiler'
import BaseProcessor from '../base-processor'

export default class VueProcessor extends BaseProcessor {
  process (key, source) {
    this.registerDynamic(key, [], true, (require, exports, module) => {
      module.exports = compileToFunctions(source)
    })
  }
}
