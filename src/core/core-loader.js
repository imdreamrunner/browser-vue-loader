import RegisterLoader from 'es-module-loader/core/register-loader'
import { fetchContent } from './fetch-source'
import {
  splitKey,
  constructKey,
  lookupNpmPackage,
  addDefaultExtension,
  checkDefaultBinary
} from './key-utils'
import Router from './router'

class BrowserVueLoader extends RegisterLoader {
  constructor (baseKey) {
    super(baseKey)
    this.router = new Router(this)
  }

  /*
   * Resolve hook
   *
   * super[RegisterLoader.resolve](key, parentKey) will return:
   *  - undefined if "key" is a plain names (eg 'lodash')
   *  - URL resolution if "key" is a relative URL (eg './x' will resolve to parentKey as a URL, or the baseURI)
   *
   */
  async [RegisterLoader.resolve] (key, parentKey) {
    let {processor, url, options} = splitKey(key)
    let {url: parentUrl} = splitKey(parentKey)
    let relativeResolved = super[RegisterLoader.resolve](url, parentUrl)
    if (relativeResolved) {
      url = relativeResolved
    }
    if (url.indexOf('://') < 0 && url.indexOf('.') < 0) {
      // NPM package
      const npmPackage = await lookupNpmPackage(url)
      if (npmPackage) {
        url = npmPackage
        processor = processor || 'commonjs'
      }
    }
    url = addDefaultExtension(url)
    if (checkDefaultBinary(url)) {
      options.binary = true
    }
    return constructKey({processor, url, options})
  }

  /*
   * Instantiate hook
   */
  async [RegisterLoader.instantiate] (key) {
    const {processor, url, options} = splitKey(key)
    const source = await fetchContent(url, Boolean(options.binary))
    if (processor) {
      await this.router.routeTo(processor, key, source)
    } else {
      await this.router.route(key, source)
    }
  }
}

// create the loader instance.
export const loader = new BrowserVueLoader()

export const loadVue = (entryUrl) => loader.import(entryUrl)
  .then(m => m.default ? m.default : m)
