import sass from 'sass.js'
import urlParse from 'url-parse'
import { addToCache, fetchFromUrl, fetchContent } from '../../core/fetch-source'
import BaseProcessor from '../base-processor'
import { constructKey, splitKey } from '../../core/key-utils'

const compileSass = (key, source, indentedSyntax = false) => {
  const parsedKey = urlParse(key)
  const {origin, pathname} = parsedKey

  const options = {}

  options.indentedSyntax = indentedSyntax
  options.inputPath = pathname

  sass.importer(async (request, done) => {
    console.log('request.resolved', request.resolved)
    const possiblePaths = sass.getPathVariations(request.resolved)
    for (let path of possiblePaths) {
      const fullpath = origin + path
      const response = await fetchFromUrl(fullpath)
      if (response.status === 200) {
        const content = await fetchContent(fullpath)
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

export class SassBaseProcessor extends BaseProcessor {
  async process (key, source, indentedSyntax = false) {
    const {url} = splitKey(key)
    const cssUrl = url + '#css'
    const compiled = await compileSass(key, source, indentedSyntax)
    addToCache(cssUrl, compiled.text)
    const cssKey = constructKey({processor: 'css', url: cssUrl})

    this.registerDynamic(key, [cssKey], true, (require, exports, module) => {
      const cssModule = require(cssKey)
      cssModule.raw = source
      module.exports = cssModule
    })
  }
}

export class ScssProcessor extends SassBaseProcessor {
  async process (key, source) {
    await super.process(key, source, false)
  }
}

export class SassProcessor extends SassBaseProcessor {
  async process (key, source) {
    await super.process(key, source, true)
  }
}
