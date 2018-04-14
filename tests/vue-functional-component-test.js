/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { wait, open } from './helpers'

describe('Vue Functional Component', () => {
  let child

  before(async () => {
    child = await open('/base/examples/vue-functional-component/index.html')
  })

  it('Loads a Vue functional component.', async () => {
    // Wait for Vue app to load.
    while (!child.find('.outside').html()) await wait(100)

    expect(child.find('.outside').html()).to.equal('Hello!')
    expect(child.find('.outside').css('color')).to.equal('rgb(255, 0, 0)')
    expect(child.find('.inside').html()).to.equal('Hello from the other side!')
    expect(child.find('.inside').css('color')).to.equal('rgb(0, 0, 255)')
  }).timeout(20000)
})
