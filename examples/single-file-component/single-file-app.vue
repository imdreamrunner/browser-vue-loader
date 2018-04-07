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

<style>
  .app h1 {
    color: red
  }
</style>
