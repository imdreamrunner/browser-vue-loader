<template>
  <div class="app">
    <h1>Hello: {{ msg }}</h1>
  </div>
</template>

<script>
  console.log('App is loaded')
  export default {
    data () {
      return {
        msg: 'World'
      }
    }
  }
</script>

<style>
  .app h1 {
    color: red
  }
</style>
