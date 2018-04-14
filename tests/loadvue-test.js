/* globals loadVue */
/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { wait, open } from './helpers'

describe('Global loadVue Method', () => {
  let child

  before(async () => {
    child = await open('/base/examples/single-file-component/index.html')
  })

  it('should register loadVue method globally.', async () => {
    while (!child.window.loadVue) await wait(100)
    expect(child.window.loadVue).to.be.a('function')
  })
})
