import { transpile } from './babel-helper'
import BaseProcessor from '../base-processor'

export default class BabelProcessor extends BaseProcessor {
  process(key, source, options) {
    console.log('process', key)

    const transformOptions = options || {}

    if (key.indexOf('!') >= 0) {
      const module = key.split('!')[0]
      transformOptions.module = module
    }

    const transformedCode = transpile(key, source, transformOptions)

    console.log('transformedCode', key, {transformedCode})

    const register = this.getRegister(key)
    const registerDynamic = this.getRegisterDynamic(key)

    function evalFunction() {
      // This variable is needed for evaluating the transformed code.
      const System = {register, registerDynamic}
      eval(transformedCode)
    }

    evalFunction.call({})
    console.log('processed', key)
  }
}
