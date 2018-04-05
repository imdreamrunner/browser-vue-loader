import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import { compileToFunctions } from 'vue-template-compiler'
import BaseProcessor from '../base-processor'


export default class VueProcessor extends BaseProcessor {

  process(key, source) {
    const compiled = compileToFunctions(source)
    this.loader.registry.set(key, new ModuleNamespace(compiled))
  }

}
