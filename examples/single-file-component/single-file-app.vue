<template>
  <div class="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'hello'
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Hi+Melody');
  .app h1 {
    font-family: 'Hi Melody',serif;
    color: red
  }
</style>

<style scoped lang="scss">
  @import "main.css";
  $primary-color: #333;
  .app {
    background-color: $primary-color;
  }
</style>
