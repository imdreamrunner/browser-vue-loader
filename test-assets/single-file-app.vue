<template>
  <div class="app">
    <h1>Hello: {{ msg }}</h1>
  </div>
</template>

<script>
  console.log('App is loaded!')
  export default {

    template: 'aaa',

    render() {
      return 'aa'
    },

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
