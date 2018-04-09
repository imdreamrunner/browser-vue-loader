import sass from 'sass.js'
import urlParse from 'url-parse'
import { fetchFromUrl } from '../../core/fetch-source'
import BaseProcessor from '../base-processor'


const compileSass = (key, source) => {
  const parsedKey = urlParse(key)
  const {origin, pathname} = parsedKey

  const options = {}
  options.inputPath = pathname

  sass.importer(async (request, done) => {
    const possiblePaths = sass.getPathVariations(request.resolved)
    for (let path of possiblePaths) {
      const response = await fetchFromUrl(origin + path)
      if (response.status === 200) {
        const content = await response.text()
        done({content})
        break
      }
    }
  })

  return new Promise(resolve => {
    sass.compile(source, options, result => {
      resolve(result)
    })
  })
}

export class ScssProcessor extends BaseProcessor {
  async process(key, source, options) {
    try {
      const compiled = await compileSass(key, source)
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
