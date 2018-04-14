<template>
  <div>
    <div class="loaded">{{ msg }}</div>
    <div class="text-apple" :class="$style.apple">Apple</div>
    <div class="text-banana" :class="$style.banana">Banana</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: `CSS Module is loaded. this.$style = ${JSON.stringify(this.$style)}`
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
