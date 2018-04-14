<script>
  export default {
    props: ['location'],

    data () {
      return {
        msg: `Hello from ${this.location}!`
      }
    },

    render: function (h) {
      return (
        <div>
          <h1 class="inside">{ this.msg }</h1>
        </div>
      )
    }
  }
</script>

<style scoped>
  h1 {
    color: blue
  }
</style>
