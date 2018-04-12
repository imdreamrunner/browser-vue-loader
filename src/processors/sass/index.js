import sass from 'sass.js'
import urlParse from 'url-parse'
import { addToCache, fetchFromUrl } from '../../core/fetch-source'
import BaseProcessor from '../base-processor'
import { constructKey, splitKey } from '../../core/key-utils'

const compileSass = (key, source) => {
  const parsedKey = urlParse(key)
  const {origin, pathname} = parsedKey

  const options = {}
  options.inputPath = pathname

  sass.importer(async (request, done) => {
    const possiblePaths = sass.getPathVariations(request.resolved)
    for (let path of possiblePaths) {
      const response = await fetchFromUrl(origin + path)
      // TODO: Remove the usage of fetch here by loading SCSS from model.
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
  async process (key, source, options) {
    const {url} = splitKey(key)
    const cssUrl = url + "#css"
    const compiled = await compileSass(key, source)
    addToCache(cssUrl, compiled.text)
    const cssKey = constructKey({processor: 'css', url: cssUrl})

    this.registerDynamic(key, [cssKey], true, (require, exports, module) => {
      exports.raw = source
      const cssModule = require(cssKey)
      exports.getCompiledCss = () => cssModule.getCompiledCss()
      exports.injectStyle = () => cssModule.injectStyle()
    })
  }
}
