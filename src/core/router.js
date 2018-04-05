import es6 from '../processors/es6'
import css from '../processors/css'
import vueSfc from '../processors/vue-sfc'
import vueTemplate from '../processors/vue-template'

const routingTable = [
  {
    name: 'es6',
    matcher: /.*\.js/,
    processor: es6,
  },
  {
    name: 'vue-sfc',
    matcher: /.*\.vue/,
    processor: vueSfc,
  },
  {
    name: 'vue-template',
    matcher: /.*\.vue/,
    processor: vueTemplate,
  },
  {
    name: 'css',
    matcher: /.*\.css/,
    processor: css,
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

  async route(key, data) {
    for (let rule of this.table) {
      if (rule.matcher.test(key)) {
        return rule.processor.process(key, data)
      }
    }
    throw new Error(`No processor to handle "${key}".`)
  }

  async routeTo(name, key, data) {
    if (Object.keys(this.processorMap).indexOf(name) < 0) {
      throw new Error(`No processor named "${name}".`)
    }
    const processor = this.processorMap[name]
    return processor.process(key, data)
  }
}
