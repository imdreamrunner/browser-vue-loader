import { transpile } from './babel-helper'
import BaseProcessor from '../base-processor'

export default class BabelProcessor extends BaseProcessor {
  process(key, source) {
    const transformedCode = transpile(key, source)

    const register = this.getRegister(key)

    function evalFunction() {
      // This variable is needed for evaluating the transformed code.
      const System = {register}
      eval(transformedCode)
    }

    evalFunction.call({})
  }
}
