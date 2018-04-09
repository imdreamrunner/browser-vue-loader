import { parseComponent } from 'vue-template-compiler'
import md5 from 'md5'
import * as componentNormalizer from './component-normalizer'
import BaseProcessor from '../base-processor'
import componentTemplate from 'raw-loader!./component-template.txt'


export default class VueProcessor extends BaseProcessor {

  async process(key, source) {
    let transformedSource = componentTemplate

    const parts = parseComponent(source)
    console.log('parts', parts)

    // register component-normalizer if it's not inside the registry.
    if (!this.getModuleByKey('component-normalizer')) {
      this.registerModuleNamespace('component-normalizer', componentNormalizer)
    }

    // <script>
    const script = parts.script.content
    const scriptKey = key + '#script'
    await this.sendToRouter('js', scriptKey, script)
    transformedSource = transformedSource.replace('__vue_script__', scriptKey)

    // <template>
    if (parts.template) {
      const templateKey = key + '#template'
      await this.sendToRouter('vue-template', templateKey, parts.template.content)
      transformedSource = transformedSource.replace('__vue_template__', templateKey)

      const functionalTemplate = parts.template.attrs && parts.template.attrs.functional || false
      transformedSource = transformedSource.replace('__vue_template_functional__', JSON.stringify(functionalTemplate))
    }

    // <style>
    const moduleId = 'data-v-' + md5(key)
    transformedSource = transformedSource.replace('__vue_scopeId__', moduleId)

    const styleImportStatements = []
    const styleExecuteStatements = []
    let counter = 0
    for (let style of parts.styles) {
      const styleKey = key + '#style-' + md5(style.content)
      const styleVariable = 'style' + counter
      const scoped = style.scoped
      const styleOptions = {
        moduleId,
        scoped
      }
      const lang = style.lang || 'css'
      await this.sendToRouter(lang, styleKey, style.content, styleOptions)
      styleImportStatements.push(`import { injectStyle as ${styleVariable} } from "${styleKey}"`)
      styleExecuteStatements.push(`${styleVariable}()`)
      counter += 1
    }
    const styleExecuteFunction = `function () {
      ${styleExecuteStatements.join('\n')}
    }`
    transformedSource = transformedSource.replace('__vue_style_imports___', styleImportStatements.join('\n'))
    transformedSource = transformedSource.replace('__vue_styles__', styleExecuteFunction)

    await this.sendToRouter('js', key, transformedSource)

    console.log('done sfc')
  }
}
