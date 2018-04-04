import RegisterLoader from 'es-module-loader/core/register-loader.js'
import { ModuleNamespace } from 'es-module-loader/core/loader-polyfill.js'

import resourceFetcher from './resource-fetcher'
import babelProcessor from '../processors/babel-processor'

export default class BrowserVueLoader extends RegisterLoader {
  /*
   * Constructor
   * Purely for completeness in this example
   */
  constructor (baseKey) {
    super(baseKey)
  }

  /*
   * Default resolve hook
   *
   * The default parent resolution matches the HTML spec module resolution
   * So super[RegisterLoader.resolve](key, parentKey) will return:
   *  - undefined if "key" is a plain names (eg 'lodash')
   *  - URL resolution if "key" is a relative URL (eg './x' will resolve to parentKey as a URL, or the baseURI)
   *
   * So relativeResolved becomes either a fully normalized URL or a plain name (|| key) in this example
   */
  [RegisterLoader.resolve] (key, parentKey) {
    const relativeResolved = super[RegisterLoader.resolve](key, parentKey) || key
    return relativeResolved
  }

  /*
   * Default instantiate hook
   *
   * This is one form of instantiate which is to return a ModuleNamespace directly
   * This will result in every module supporting:
   *
   *   import { moduleName } from 'my-module-name';
   *   assert(moduleName === 'my-module-name');
   */
  async [RegisterLoader.instantiate] (key, processAnonRegister) {
    const source = await resourceFetcher.fetch(key)
    await babelProcessor(key, source, (...args) => this.register(...args))
    processAnonRegister()
  }
}
