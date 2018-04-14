import { compile } from 'vue-template-compiler'
import transpile from 'vue-template-es2015-compiler'
import BaseProcessor from '../base-processor'
import { addToCache } from '../../core/fetch-source'
import { constructKey, splitKey } from '../../core/key-utils'

export default class VueProcessor extends BaseProcessor {
  process (key, source) {
    const {url, options} = splitKey(key)
    const stripWithFunctional = options.functional

    // First, use vue-template-compiler to compile the template
    const compiled = compile(source)

    // Second, use vue-template-es2015-compiler to transpile the generated
    // render function with extra ES2015 features,
    // and most importantly striping with and supports functional.

    const bubleOptions = {
      transforms: {
        stripWith: true,
        stripWithFunctional: stripWithFunctional
      }
    }

    const staticRenderFns = compiled.staticRenderFns.map(fn =>
      toFunction(fn, stripWithFunctional)
    )

    let code =
      transpile(
        'var render = ' +
        toFunction(compiled.render, stripWithFunctional) +
        '\n' +
        'var staticRenderFns = [' +
        staticRenderFns.join(',') +
        ']',
        bubleOptions
      ) + '\n'

    if (bubleOptions.transforms.stripWith) {
      // mark with stripped (this enables Vue to use correct runtime proxy detection)
      code += `render._withStripped = true\n`
    }
    code += `export { render, staticRenderFns }`

    const sourceUrl = url + '#source'
    const sourceKey = constructKey({url: sourceUrl, processor: 'es'})
    addToCache(sourceUrl, code)

    this.registerDynamic(key, [sourceKey], true, (require, exports, module) => {
      module.exports = require(sourceKey)
    })
  }
}

function toFunction (code, stripWithFunctional) {
  return (
    'function (' + (stripWithFunctional ? '_h,_vm' : '') + ') {' + code + '}'
  )
}
