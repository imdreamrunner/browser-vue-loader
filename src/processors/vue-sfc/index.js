import { parseComponent } from 'vue-template-compiler'
import md5 from 'md5'
import componentNormalizer from './component-normalizer'
import BaseProcessor from '../base-processor'
import { addToCache } from '../../core/fetch-source'
import { constructKey, splitKey } from '../../core/key-utils'

const supportedStyles = ['css', 'scss']

export default class VueProcessor extends BaseProcessor {
  async process (key, source) {
    const {url} = splitKey(key)

    const dependencies = []

    const parts = parseComponent(source)

    // <script>
    const scriptContent = parts.script.content
    const scriptUrl = url + '#script'
    addToCache(scriptUrl, scriptContent)

    const scriptKey = constructKey({processor: 'es', url: scriptUrl})
    dependencies.push(scriptKey)

    // <template>
    let templateKey = null
    let functionalTemplate = false
    if (parts.template) {
      const templateContent = parts.template.content
      const templateUrl = url + '#template'
      addToCache(templateUrl, templateContent)

      templateKey = constructKey({processor: 'vue-template', url: templateUrl})
      dependencies.push(templateKey)
      functionalTemplate = (parts.template.attrs && parts.template.attrs.functional) || false
    }

    // <style>
    const scopeId = 'data-v-' + md5(key)
    const styleKeyList = []
    let hasScopedStyle = false
    const cssModules = {}
    for (let style of parts.styles) {
      if (!style.content) {
        continue
      }

      const styleUrl = url + '#style-' + md5(style.content)
      addToCache(styleUrl, style.content)

      const scoped = style.scoped
      if (scoped) hasScopedStyle = true
      const styleOptions = {scopeId, scoped, module: style.module}
      const lang = style.lang || 'css'
      if (supportedStyles.indexOf(lang) < 0) {
        throw new Error(`Style "${lang}" is not supported.`)
      }
      const styleKey = constructKey({processor: lang, url: styleUrl, options: styleOptions})
      dependencies.push(styleKey)
      styleKeyList.push(styleKey)

      cssModules[styleKey] = style.module === true ? '$style' : style.module
    }

    this.registerDynamic(key, dependencies, true, (require, exports, module) => {
      const script = require(scriptKey)
      let render, staticRenderFns
      if (templateKey) {
        const template = require(templateKey)
        render = template.render
        staticRenderFns = template.staticRenderFns
      }

      function loadStyleFunction () {
        styleKeyList.forEach(styleKey => {
          const requiredStyle = require(styleKey)
          requiredStyle.injectStyle()
          this[cssModules[styleKey]] = requiredStyle.classNameMapping
        })
      }

      module.exports = componentNormalizer(
        script,
        render,
        staticRenderFns,
        functionalTemplate,
        loadStyleFunction,
        hasScopedStyle ? scopeId : null
      ).exports
    })
  }
}
