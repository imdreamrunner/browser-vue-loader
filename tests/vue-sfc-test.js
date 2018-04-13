/* globals loadVue */
/* globals $ */
/* eslint-disable no-unused-expressions */

import { describe, it, before } from 'mocha'
import { expect } from 'chai'
import { loadLib, wait, createDiv } from './helpers'

describe('Vue Single File Component', () => {
  before(async () => {
    await loadLib()
  })

  it('should be able to load the sample SFC.', async () => {
    createDiv()

    const App = await loadVue('/base/examples/single-file-component/single-file-app.vue')
    const Vue = await loadVue('vue')
    new Vue({
      render: h => h(App)
    }).$mount('#app')

    // Wait for Vue app to load.
    for (let i = 0; i < 10; i++) {
      if ($('.app h1').css('color') !== 'rgb(255, 0, 0)') {
        await wait(1000)
      }
    }

    const backgroundColor = $('.app h1').css('color')
    expect(backgroundColor).to.equal('rgb(255, 0, 0)')
  }).timeout(20000)
})
