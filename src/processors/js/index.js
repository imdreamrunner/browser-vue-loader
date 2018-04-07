import { transpile } from './babel-helper'
import BaseProcessor from '../base-processor'

export class JsProcessor extends BaseProcessor {
  process(key, source, module) {
    const transformedCode = transpile(key, source, {module})
    this.registerEsSourceCode(key, transformedCode)
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
