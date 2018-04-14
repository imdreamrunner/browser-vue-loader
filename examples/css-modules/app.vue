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

<!--
In this example, there are 2 CSS class will be loaded to this.$style, the .apple and .banana.

.apple is defined in the imported CSS file ./sample-css.css

.banana is defined locally inside the <style> tag.
-->

<style module>
  @import "sample-css.css";
  .banana {
    color: yellow;
    font-weight: bold;
  }
</style>
