import RegisterLoader from 'es-module-loader/core/register-loader'
import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import fetchSource from './fetch-source'
import resolveKey from './resolve-key'
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
  [RegisterLoader.resolve] (key, parentKey) {
    let relativeResolved = super[RegisterLoader.resolve](key, parentKey) || key
    return resolveKey(relativeResolved)
  }

  /*
   * Instantiate hook
   */
  async [RegisterLoader.instantiate] (key) {
    const source = await fetchSource(key)
    await this.router.route(key, source)
  }
}

// create the loader instance.
export const loader = new BrowserVueLoader()

export const loadVue = (entryUrl) => loader.import(entryUrl).then(m => m.default ? m.default : m)
