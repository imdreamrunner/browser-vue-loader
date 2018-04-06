import { transpile } from './babel-helper'
import BaseProcessor from '../base-processor'

export class JsProcessor extends BaseProcessor {
  process(key, source, module) {
    console.log('process', key)

    const transformedCode = transpile(key, source, {module})

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

export class EsModuleProcessor extends JsProcessor {
  process(key, source) {
    super.process(key, source, 'es')
  }
}

export class AmdModuleProcessor extends JsProcessor {
  process(key, source) {
    super.process(key, source, 'amd')
  }
}

export class CommonJsModuleProcessor extends JsProcessor {
  process(key, source) {
    super.process(key, source, 'commonjs')
  }
}
