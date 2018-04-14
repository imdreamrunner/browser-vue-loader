<template>
  <div class="app">
    <div class="loaded">{{ msg }}</div>
    <div class="blue">Blue colored by @import of CSS file in SASS.</div>
    <div class="brown">Brown colored by SASS in style tag.</div>
    <div class="aqua">Aqua colored by SASS with @import.</div>
    <div class="purple">Purple colored by SCSS.</div>
    <div class="pink">Pink colored by SCSS @import.</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Loaded.'
      }
    }
  }
</script>

<style lang="sass">
  @import "sample-css.css"
  $brown-color: rgb(165, 42, 42)
  .brown
    color: $brown-color
</style>

<style lang="sass">
  @import "sample-sass"
  .aqua
    color: $aqua-color
</style>

<style lang="scss">
  $purple-color: rgb(128, 0, 128);
  .purple {
    color: $purple-color;
  }
</style>

<style lang="scss">
  @import "sample-scss";
  .pink {
    color: $pink-color;
  }
</style>
