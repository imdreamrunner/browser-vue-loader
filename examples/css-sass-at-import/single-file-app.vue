<template>
  <div class="app">
    <h1>{{ msg }}</h1>
    <h2>h2</h2>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '...'
      }
    }
  }
</script>


<style>
  @import "sample-css.css";
  h1 {
    background: purple;
  }
</style>

<style scoped lang="scss">
  $primary-color: yellow;
  .app {
    color: $primary-color;
  }
</style>

<style scoped lang="scss">
  @import "sample-scss";
  h2 {
    color: $h2-color;
  }
</style>
