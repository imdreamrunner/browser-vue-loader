/**
 * This file contains the {@link BaseProcessor} that will be extended
 * by all processors.
 */

import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'

/**
 * The base processor.
 */
export default class BaseProcessor {
  constructor (loader) {
    this._loader = loader
  }

  importModule = async (key, parentKey) => this._loader.import(key, parentKey)

  register = (...args) => this._loader.register(...args)

  registerDynamic = (...args) => this._loader.registerDynamic(...args)

  registerModuleNamespace = (key, module) => this._loader.registry.set(key, new ModuleNamespace(module))

  registerEsSourceCode (key, source) {
    const register = (...args) => this.register(key, ...args)
    const registerDynamic = (...args) => this.registerDynamic(key, ...args)
    function evalFunction () {
      /* eslint-disable no-unused-vars */
      /* eslint-disable no-eval */
      // This variable is needed for evaluating the transformed code.
      const System = {register, registerDynamic}
      eval(source)
      /* eslint-enable no-unused-vars */
      /* eslint-enable no-eval */
    }
    evalFunction.call({})
  }
}
