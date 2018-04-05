import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import { parseComponent, compile } from 'vue-template-compiler'
import BaseProcessor from '../base-processor'


export default class VueProcessor extends BaseProcessor {

  stringToFunction = strFunc => `function () { ${strFunc} }`

  process(key, source) {
    const compiled = compile(source)
    const staticRenderFns = compiled.staticRenderFns.map(fn =>this.stringToFunction(fn))
    const transformedSource = `
      export const render = ${this.stringToFunction(compiled.render)};
      export const staticRenderFns = [${staticRenderFns.join(',')}];
    `
    this.loader.router.routeTo('es6', key, transformedSource)
  }

}
