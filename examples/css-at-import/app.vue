<template>
  <div class="app">
    <div class="loaded">{{ msg }}</div>
    <div class="yellow">Yellow colored by CSS style tag.</div>
    <div class="blue">Blue colored by CSS @import.</div>
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

<style>
  @import "sample-css.css";

  .yellow {
    color: rgb(255, 255, 0);
    font-weight: bold;
  }
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
