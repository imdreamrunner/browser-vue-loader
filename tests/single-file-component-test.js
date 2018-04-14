/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { wait, open } from './helpers'

describe('Vue Single File Component', () => {
  let child

  before(async () => {
    child = await open('/base/examples/single-file-component/index.html')
  })

  it('Loads a simple Single File Component.', async () => {
    // Wait for Vue app to load.
    while (child.find('.app h1').css('color') !== 'rgb(255, 0, 0)') await wait(100)

    const backgroundColor = child.find('.app h1').css('color')
    expect(backgroundColor).to.equal('rgb(255, 0, 0)')
  }).timeout(20000)
})
