import sass from 'sass.js'
import BaseProcessor from '../base-processor'

const compileSass = (source, options) => {
  return new Promise(resolve => {
    sass.compile(source, result => {
      console.log(result)
      resolve(result)
    })
  })
}

export class ScssProcessor extends BaseProcessor {
  async process(key, source, options) {
    try {
      const compiled = await compileSass(source)
      this.sendToRouter('css', key, compiled.text, options)
    } catch (ex) {
      console.log('ex', ex)
      this.sendToRouter('css', key, '', options)
    }
  }
}
