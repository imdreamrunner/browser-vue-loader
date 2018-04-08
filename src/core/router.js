import {EsModuleProcessor, AmdModuleProcessor, CommonJsModuleProcessor} from '../processors/js'
import CssProcessor from '../processors/css'
import {ScssProcessor} from '../processors/sass'
import VueSfcProcessor from '../processors/vue-sfc'
import VueTemplateProcessor from '../processors/vue-template'

const routingTable = [
  {
    name: 'js',
    matcher: /.*\.js/,
    processor: EsModuleProcessor,
  },
  {
    name: 'es',
    processor: EsModuleProcessor,
  },
  {
    name: 'amd',
    processor: AmdModuleProcessor,
  },
  {
    name: 'commonjs',
    processor: CommonJsModuleProcessor,
  },
  {
    name: 'vue-sfc',
    matcher: /.*\.vue/,
    processor: VueSfcProcessor,
  },
  {
    name: 'vue-template',
    matcher: /.*\.vue/,
    processor: VueTemplateProcessor,
  },
  {
    name: 'css',
    matcher: /.*\.css/,
    processor: CssProcessor,
  },
  {
    name: 'scss',
    matcher: /.*\.scss/,
    processor: ScssProcessor,
  },
]

export default class Router {
  constructor (loader) {
    this.loader = loader
    this.processorMap = {}
    this.table = routingTable.map(rule => {
      rule.processor = new rule.processor(loader)
      this.processorMap[rule.name] = rule.processor
      return rule
    })
  }

  async route(key, data, ...args) {
    for (let rule of this.table) {
      if (rule.matcher && rule.matcher.test(key)) {
        return rule.processor.process(key, data, ...args)
      }
    }
    throw new Error(`No processor to handle "${key}".`)
  }

  async routeTo(name, key, data, ...args) {
    if (Object.keys(this.processorMap).indexOf(name) < 0) {
      throw new Error(`No processor named "${name}".`)
    }
    const processor = this.processorMap[name]
    return processor.process(key, data, ...args)
  }
}
