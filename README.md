Browser Vue Loader
==================

Browser Vue Loader is a single file JavaScript library
that loads untranspile Vue applications into the browsers.

## Usage

Include Vue and the loader into your HTML file.

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script src="dist/browser-vue-loader.js"></script>
```

And you can now load Vue modules by the `loadVue` function. The loaded module
will be returned as a promise.

```html
<div id="app"></div>

<script>
loadVue('./App.vue').then(App => {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
</script>
```

## What is supported

Besides Vue's single file component (SFC), the following resources will be supported
if you load them via the `import` statement in JavaScript or the `src`
attributes in Vue SFC's `<template>` `<script>` or `<style>` tags.

Supporting list

* Vue's single file component (`*.vue`)
* CSS (`*.css`)

Coming soon:

* SASS (`*.sass`, `*.scss`)

## Contributors's Guide

To develop:

```bash
npm install
npm run dev
```
