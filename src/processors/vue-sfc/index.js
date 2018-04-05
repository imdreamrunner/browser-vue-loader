import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import { parseComponent, compile } from 'vue-template-compiler'
import BaseProcessor from '../base-processor'
import componentTemplate from 'raw-loader!./component-template.txt'


export default class VueProcessor extends BaseProcessor {

  process(key, source) {
    let transformedSource = componentTemplate

    const parts = parseComponent(source)

    // <script>
    const script = parts.script.content
    const scriptKey = key + '!script'

    this.loader.router.routeTo('es6', scriptKey, script)

    transformedSource = transformedSource.replace('__vue_script__', scriptKey)

    // <template>
    const templateKey = key + '!template'
    this.loader.router.routeTo('vue-template', templateKey, parts.template.content)
    transformedSource = transformedSource.replace('__vue_template__', templateKey)

    this.loader.registry.set('empty', new ModuleNamespace({}))
    transformedSource = transformedSource.replace('__vue_static_render_fns__', 'empty')
    transformedSource = transformedSource.replace('__vue_template_functional__', 'empty')
    transformedSource = transformedSource.replace('__vue_template_functional__', 'empty')
    transformedSource = transformedSource.replace('__vue_styles__', 'empty')
    transformedSource = transformedSource.replace('__vue_scopeId__', 'empty')
    transformedSource = transformedSource.replace('__vue_module_identifier__', 'empty')

    this.loader.router.routeTo('es6', key, transformedSource)
  }
}
