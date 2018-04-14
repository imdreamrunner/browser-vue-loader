/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { open, wait } from './helpers'

describe('At Import (@import)', () => {
  let child

  before(async () => {
    child = await open('/base/examples/at-import/index.html')
  })

  it('Check if color is loaded correctly.', async () => {
    while (!child.find('.loaded').html()) await wait(100)
    expect(child.find('.yellow').css('color')).to.equal('rgb(255, 255, 0)')
    expect(child.find('.blue').css('color')).to.equal('rgb(0, 0, 255)')
    expect(child.find('.purple').css('color')).to.equal('rgb(128, 0, 128)')
    expect(child.find('.pink').css('color')).to.equal('rgb(255, 192, 203)')
  }).timeout(20000)
})
