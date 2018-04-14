/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { wait, open } from './helpers'

describe('ES Modules.', () => {
  let child

  before(async () => {
    child = await open('/base/examples/es-modules/index.html')
  })

  it('Should be able to load ES modules', async () => {
    while (!child.window.module) await wait(100)

    const module = child.window.module

    expect(module).is.not.null
    expect(module.currentModuleFunction).to.be.a('function')
    expect(module.currentModuleFunction()).to.equal(1)

    expect(module.loadedFromOtherModule).to.be.a('function')
    expect(module.loadedFromOtherModule()).to.equal('string from another module.')

    expect(module.importFromLodash).to.be.a('function')
    expect(module.importFromLodash()).to.deep.equal([[1, 3], [2, 4]])
  }).timeout(20000)
})
