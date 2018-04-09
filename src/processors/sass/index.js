import sass from 'sass.js'
import BaseProcessor from '../base-processor'

const compileSass = (source, options) => {
  return new Promise(resolve => {
    sass.compile(source, result => {
      console.log('sass result', result)
      resolve(result)
    })
  })
}

export class ScssProcessor extends BaseProcessor {
  async process(key, source, options) {
    try {
      const compiled = await compileSass(source)
      let compiledCss = compiled.text
      if (!compiledCss) {
        console.warn('Sass compile error', compiled)
        compiledCss = ''
      }
      await this.sendToRouter('css', key, compiledCss, options)
    } catch (ex) {
      console.log('ex', ex)
      await this.sendToRouter('css', key, '', options)
    }
  }
}
