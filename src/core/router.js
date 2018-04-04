import es6 from '../processors/es6'
import vue from '../processors/vue'

const routingTable = [
  {
    matcher: /.*\.js/,
    processor: es6,
  },
  {
    matcher: /.*\.vue/,
    processor: vue,
  }
]

export default class Router {
  constructor (loader) {
    this.loader = loader
    this.table = routingTable.map(rule => {
      rule.processor = new rule.processor(loader)
      return rule
    })
  }

  async route(key, data) {
    for (let rule of this.table) {
      if (rule.matcher.test(key)) {
        return await rule.processor.process(key, data)
      }
    }
    throw new Error(`No processor to handle "${key}".`)
  }
}
