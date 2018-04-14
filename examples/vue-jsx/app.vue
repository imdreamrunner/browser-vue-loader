<script>
  import HelloComponent from './hello-component.vue'

  export default {
    data () {
      return {
        msg: 'Hello!'
      }
    },

    render: function (h) {
      return (
        <div>
          <h1 class="outside">{ this.msg }</h1>
          <HelloComponent location="the other side" />
        </div>
      )
    }
  }
</script>

<style>
  h1 {
    color: red
  }
</style>
