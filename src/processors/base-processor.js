export default class BaseProcessor {
  constructor (loader) {
    this.loader = loader
    this.getRegister = key => (...args) => this.loader.register(key, ...args)
  }

}
