![Browser Vue Loader](./banner.png)

Browser Vue Loader
==================

[![Build Status](https://img.shields.io/travis/imdreamrunner/browser-vue-loader/master.svg?style=flat-square)](https://travis-ci.org/imdreamrunner/browser-vue-loader)
[![NPM Version](https://img.shields.io/npm/v/browser-vue-loader.svg?style=flat-square)](https://www.npmjs.com/package/browser-vue-loader)

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

## Supporting Features

### Loads Vue single file components and ES modules

The `loadVue` methods supports both Vue single file components and ES modules.

Examples:

* [➡️ Load Vue SFC](https://imdreamrunner.github.io/browser-vue-loader/examples/single-file-component/)
* [➡️ Load ES Module](https://imdreamrunner.github.io/browser-vue-loader/examples/es-modules/)

In `<script type="boom!">` or your source code, you can also use the import statement
to load another module. The name of the loaded module must be a relative or full
URL, such as `./App.vue` or `http://example.com/path/to/App.vue`.

```javascript
import App from './App.vue';
```

The module system is based on the
[WhatWG loader specification](https://whatwg.github.io/loader/),
which describes the behavior of loading JavaScript modules from a
JavaScript host environment.

A more complete example of a Vue application is the TODO MVC, which
contains of two components `App.vue` and `Todos.vue`.

* [➡️ TODO MVC](https://imdreamrunner.github.io/browser-vue-loader/examples/todo-mvc/)


### Loads a CommonJS or AMD module from NPM registry

The loader can directly load a CommonJS or AMD module from NPM registry,
if the name of the module cannot be resolved to a valid URL.

For example, by writing

```javascript
import Vue from 'vue';
```

The loader will realise that the string `vue` is not a valid URL, so
if will search for the package use the [unpkg.com](https://unpkg.com/)
CDN. The actual URL of the module will be resolved to
`https://unpkg.com/vue@2.5.16/dist/vue.js`.

By default, the loader will process the module as a CommonJS module.
You can specify the process by adding the prefix `<processor>!` to the
module name.

For example, the following 2 import statements are working.

```javascript
import Vue from 'commonjs!vue';  // Treat the module as a CommonJS module
import _ from 'amd!lodash';  // Treat the module as an AMD module
```

## Contributors's Guide

Want to contribute to this loader? That's great!

We recommend you to use [yarn](https://yarnpkg.com/en/docs/getting-started)
to manage the dependencies. However, you can certainly use `npm` instead.

After cloning the repository, use `yarn` command to install the dependencies.
Other commands and their descriptions are below.

| Command | Description |
|---------|-------------|
| `yarn` | Install the dependencies. |
| `yarn dev` | Run the webpack dev server. |
| `yarn build` | Build the library. |
| `yarn test` | Run the test cases with karma. |

Note: we chose to commit `dist` directory to git for convenience.
There is so far no issue for it. However we might consider ignoring it
from our git repository if it grows too big one day.

## Credits

The cat in our banner is from the
[openclipart.org](https://openclipart.org/detail/85915/cat-6).
