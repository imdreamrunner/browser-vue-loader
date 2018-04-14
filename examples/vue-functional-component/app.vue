<script>
  import HelloComponent from './functional-hello-component.vue'

  console.log('HelloComponent', HelloComponent)
//  <HelloComponent location="the other side" />
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
