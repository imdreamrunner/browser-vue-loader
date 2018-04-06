Browser Vue Loader
==================

Browser Vue Loader is a single file JavaScript library
that loads untranspile Vue applications into the browsers.

This loader is ideal for rapid prototyping. With the loader,
you don't have to configure built tools, but rather write
the application code and run them in the browser.

We prefer convention over configuration in this loader.
It's pre-configured with NPM module loaders, CSS processors,
image loaders and etc.

## Usage

### The Preferred Way Is

Include the loader and write your script within a `<script type="boom!">`.

```html
<script src="https://unpkg.com/browser-vue-loader"></script>

<script type="boom!">
import Vue from 'vue';
import App from './todo-mvc-import-vue/App.vue';
new Vue({
  render: h => h(App)
}).$mount('#app')
</script>
```

### But You Also Can

Include Vue and the loader into your HTML file.
And you can load Vue modules by the `loadVue` function. The loaded module
will be returned as a promise.

```html
<div id="app"></div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/browser-vue-loader"></script>

<script>
loadVue('./App.vue').then(App => {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
</script>
```

## What Is Supported

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
