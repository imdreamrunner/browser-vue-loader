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

In many ways, this loader behaves very similar to the
[vue-loader](https://github.com/vuejs/vue-loader) for Webpack.
The major difference is that this loader does not access
the local file system and requires no build steps.

We prefer convention over configuration in this loader.
You can load Vue's single-file component, ES module,
NPM packages, SASS styles and even images directly!

## Usage

### The Preferred Way

Include the loader and write your script within a `<script type="boom!">`.

```html
<script src="https://unpkg.com/browser-vue-loader"></script>

<script type="boom!">
import Vue from 'vue';
import App from './path-to-your/App.vue';
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

### Loads Vue single-file components from a URL

The `loadVue` method can load Vue single-file components. The method takes only
one argument, which is the URL of the file to be fetched from.
The URL must be either relative or full, such as `./App.vue` or `http://example.com/path/to/App.vue`.

In the following example, we load the `./single-file-app.vue` component by `loadVue('./single-file-app.vue')`.
The `loadVue` method will return a `Promise` of the component.
When the promise is resolved, we can create the Vue app by mounting it to a DOM element.

```javascript
loadVue('./single-file-app.vue').then(App => {
  new Vue({
    render: h => h(App)
  }).$mount('#app')
})
```

* [➡️ Vue's Single-File Component](https://imdreamrunner.github.io/browser-vue-loader/examples/single-file-component/)

### Loads any ES module from a URL

Beside Vue single-file components, the loader can actually load any ES module to the web page.

In the following example, a ES component is loaded by `loadVue('./sample-es-module')`.

* [➡️ Load ES Module](https://imdreamrunner.github.io/browser-vue-loader/examples/es-modules/)

### Use `import` statement as usual

In the `<script type="boom!">` or your source code, you can also use the import statement
to load another module. Just as what you would do normally with webpack and babel configured.

```javascript
import App from './App.vue';
```

The loader's module system is based on the
[WhatWG loader specification](https://whatwg.github.io/loader/),
which describes the behavior of loading JavaScript modules from a
JavaScript host environment.

A more complete example of a Vue application is the TODO MVC, which
contains of two components `App.vue` and `Todos.vue`.

* [➡️ TODO MVC](https://imdreamrunner.github.io/browser-vue-loader/examples/todo-mvc/)

### Loads a CommonJS or AMD module from a URL or NPM registry

The loader can directly load a CommonJS or AMD module from NPM registry,
if the name of the module cannot be resolved to a valid URL.

For example, by writing

```javascript
import Vue from 'vue';
```

The loader will realise that the string `vue` is not a valid URL, so
it will search for the package use the [unpkg.com](https://unpkg.com/)
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

* [➡️ Load Lodash](https://imdreamrunner.github.io/browser-vue-loader/examples/es-modules/)

### Use Vuex

Vuex is a aentralized state management library for Vue. You can use Vuex in your project with this loader.

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins
})
```

* [➡️ TODO MVC](https://imdreamrunner.github.io/browser-vue-loader/examples/todo-mvc/)

### Functional component by template

You can write Vue's functional component in a `.vue` file. All you need is to
mark the `<template>` to be `functional`, as the example below.

```html
<template functional>
  <div>
    <h1 class="inside">Hello from {{ props.location }}!</h1>
  </div>
</template>
```

* [➡️ Functional Component](https://imdreamrunner.github.io/browser-vue-loader/examples/vue-functional-component/)

### Use JSX

Sometimes you may wish to write a render function instead of a template.
JSX allows you to write something similar to HTML tags inside JavaScript.

```html
<script>
  import HelloComponent from './hello-component.vue'

  export default {
    data () {
      return {
        msg: 'Hello!'
      }
    },

    render: function (h) {
      return (
        <div>
          <h1 class="outside">{ this.msg }</h1>
          <HelloComponent location="the other side" />
        </div>
      )
    }
  }
</script>
``` 

* [➡️ Vue with JSX](https://imdreamrunner.github.io/browser-vue-loader/examples/vue-jsx/)

### Scoped CSS

Scoped CSS is supported in single-file components.

```html
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

* [➡️ Scoped CSS](https://imdreamrunner.github.io/browser-vue-loader/examples/vue-functional-component/)

Note: the second line in this example is created by the child component with a
scoped CSS style setting the color to blue.

### SASS (with both SCSS and SASS style)

Feel free to use SASS in the single-file component. CSS processors are already configured for you.

```html
<style lang="scss">
  $purple-color: rgb(128, 0, 128);
  .purple {
    color: $purple-color;
  }
</style>
```

* [➡️ SASS](https://imdreamrunner.github.io/browser-vue-loader/examples/sass/)

### Use @import in CSS or SASS

You can use `@import` in the CSS or SASS code.

The loader will convert them into a special ES module and add to the registry.
Same file will not be downloaded twice.

In the single-file component:

```html
<style lang="scss">
  @import "sample-scss";
  .pink {
    color: $pink-color;
  }
</style>
```

In `sample-scss.scss`

```scss
$pink-color: rgb(255, 192, 203)
```

* [➡️ CSS @import](https://imdreamrunner.github.io/browser-vue-loader/examples/css-at-import/)

### CSS Modules

Modularize your CSS by [CSS Modules](https://github.com/css-modules/css-modules). They are supported!

For example, the `.banana` style below can be accessed by `this.$style.banana`.

```html
<style module>
  .banana {
    color: yellow;
  }
</style>
```

And the `.orange` style below can be accessed by `this.namedModule.orange`.

```html
<style module="namedModule">
  .orange {
    color: orange;
  }
</style>

```

* [➡️ CSS @import](https://imdreamrunner.github.io/browser-vue-loader/examples/css-modules/)

### Images

A web page is not complete without images.
You can import images as if an ES module,
and use them like a URL.

The image will be fetched and converted to base64 data URL automatically.

```html
<template>
  <div class="app">
    <img class="image-1" :src="pngImage" />
    <img class="image-2" :src="svgImage" />
  </div>
</template>

<script>
  import pngImage from "./logo.png"
  import svgImage from "./logo.svg"

  export default {
    data () {
      return {pngImage, svgImage}
    }
  }
</script>
```

* [➡️ Import Images](https://imdreamrunner.github.io/browser-vue-loader/examples/import-image/)

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
| `yarn start-test` | Start karma test runner. |
| `yarn run-test --grep="Test Name"` | Run single test. |

Note: we chose to commit `dist` directory to git for convenience.
There is so far no issue for it. However we might consider ignoring it
from our git repository if it grows too big one day.

## Credits

The cat in our banner is from the
[openclipart.org](https://openclipart.org/detail/85915/cat-6).
