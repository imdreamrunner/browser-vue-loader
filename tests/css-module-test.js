/* globals loadVue */
/* globals $ */
/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { loadLib, wait, createDiv } from './helpers'

describe('CSS Modules', () => {
  before(async () => {
    await loadLib()
  })

  it('load module as $style', async () => {
    const div = 'css-module-test'
    createDiv(div)

    const App = await loadVue('/base/examples/css-modules/app.vue')
    const Vue = await loadVue('vue')
    new Vue({
      render: h => h(App)
    }).$mount(`#${div}`)

    while ($('.loaded').html() !== 'loaded') {
      await wait(100)
    }

    expect($('.text-apple').css('color')).to.equal('rgb(255, 0, 0)')
    expect($('.text-banana').css('color')).to.equal('rgb(255, 255, 0)')
  }).timeout(20000)
})
