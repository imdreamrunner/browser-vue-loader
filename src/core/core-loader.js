import RegisterLoader from 'es-module-loader/core/register-loader'
import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill'
import fetchSource from './fetch-source'
import resolveKey from './resolve-key'
import Router from './router'
import * as componentNormalizer from '../runtime/component-normalizer'

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
  async [RegisterLoader.instantiate] (key, processAnonRegister) {
    const source = await fetchSource(key)
    await this.router.route(key, source)
    // console.log('processAnonRegister', processAnonRegister)
  }
}


const loader = new BrowserVueLoader()

const componentNormalizerModule = new ModuleNamespace(componentNormalizer)
loader.registry.set('component-normalizer', componentNormalizerModule)
console.log('new ModuleNamespace(componentNormalizer)', componentNormalizerModule)
window.componentNormalizerModule = componentNormalizerModule

const loadVue = (entryUrl) => loader.import(entryUrl)

export default loadVue
