import { describe, it } from 'mocha'
import { expect } from 'chai'
import { loadLib } from './helpers'

describe('Loading the browser-vue-loader.js', () => {
  before(async () => {
    await loadLib()
  })

  it('should register loadVue method globally.', () => {
    expect(loadVue).to.be.a('function')
  })

  it('should be able to load ES modules', async () => {
    const module = await loadVue('/base/examples/es-modules/sample-es-module')
    expect(module).is.not.null
    expect(module.currentModuleFunction).to.be.a('function')
    expect(module.currentModuleFunction()).to.equal(1)

    expect(module.loadedFromOtherModule).to.be.a('function')
    expect(module.loadedFromOtherModule()).to.equal('abc')

    expect(module.importFromLodash).to.be.a('function')
    expect(module.importFromLodash()).to.deep.equal([[1, 3], [2, 4]])
  }).timeout(5000)
})
