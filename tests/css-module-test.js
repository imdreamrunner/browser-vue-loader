/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { open, wait } from './helpers'

describe('CSS Modules', () => {
  let child

  before(async () => {
    child = await open('/base/examples/css-modules/index.html')
  })

  it('Load module as $style', async () => {
    while (!child.find('.text-apple').html()) await wait(100)
    expect(child.find('.text-apple').css('color')).to.equal('rgb(255, 0, 0)')
    expect(child.find('.text-banana').css('color')).to.equal('rgb(255, 255, 0)')
  }).timeout(20000)
})
