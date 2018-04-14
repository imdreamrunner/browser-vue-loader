<template>
  <div class="app">
    <div class="loaded">{{ msg }}</div>
    <img class="image-1" :src="pngImage" width="100" />
    <img class="image-2" :src="svgImage" width="100" />
  </div>
</template>

<script>
  import pngImage from "./logo.png"
  import svgImage from "./logo.svg"

  export default {
    data () {
      const msg = 'loaded'
      return {msg, pngImage, svgImage}
    }
  }
</script>

<style>
</style>

