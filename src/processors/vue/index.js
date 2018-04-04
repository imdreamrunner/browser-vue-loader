import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import { parseComponent, compile } from 'vue-template-compiler'
import BaseProcessor from '../BaseProcessor'
import componentTemplate from 'raw-loader!./component-template'
import BabelProcessor from '../es6/index'


const vueProcessor = (key, source, registerFunction) => {

  const parts = parseComponent(source)
  console.log('parts', parts)

  const script = parts.script.content

}

export default class VueProcessor extends BaseProcessor {
  constructor (...args) {
    super(...args)
    this.babelProcessor = new BabelProcessor(...args)
  }

  process(key, source) {
    let transformedSource = componentTemplate

    const parts = parseComponent(source)
    console.log('parts', parts)

    // <script>
    const script = parts.script.content
    const scriptKey = key + '!script'

    this.babelProcessor.process(scriptKey, script)

    transformedSource = transformedSource.replace('__vue_script__', scriptKey)

    // <template>
    const template = compile(parts.template.content)
    console.log('template', template)
    const templateKey = key + '!template'
    this.loader.registry.set(templateKey, new ModuleNamespace({default: parts.template.content}))
    transformedSource = transformedSource.replace('__vue_render__', templateKey)


    this.loader.registry.set('empty', new ModuleNamespace({}))
    transformedSource = transformedSource.replace('__vue_static_render_fns__', 'empty')
    transformedSource = transformedSource.replace('__vue_template_functional__', 'empty')
    transformedSource = transformedSource.replace('__vue_template_functional__', 'empty')
    transformedSource = transformedSource.replace('__vue_styles__', 'empty')
    transformedSource = transformedSource.replace('__vue_scopeId__', 'empty')
    transformedSource = transformedSource.replace('__vue_module_identifier__', 'empty')

    this.babelProcessor.process(key, transformedSource)
  }
}
