<template>
  <div>
    <div class="loaded">{{ msg }}</div>
    <div :class="$style.apple">Apple</div>
    <div :class="$style.banana">Banana</div>
  </div>
</template>

<script>
  export default {
    data () {
      console.log(this.$style)
      return {
        msg: 'loaded'
      }
    }
  }
</script>

<style module>
  @import "sample-css.css";
  .banana {
    color: yellow;
    font-weight: bold;
  }
</style>
