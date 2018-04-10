import { compileToFunctions } from 'vue-template-compiler'
import BaseProcessor from '../base-processor'

export default class VueProcessor extends BaseProcessor {
  process (key, source) {
    const compiled = compileToFunctions(source)
    this.registerModuleNamespace(key, compiled)
  }
}
