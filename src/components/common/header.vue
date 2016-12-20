<template>
  <div class="navi">



    <router-link to="/hello">Go to first</router-link>
    <router-link to="/hello2">Go to second</router-link>

  </div>
</template>

<script>




export default {
  name: 'navi',
  data () {
    return {
      msg: ''
    }
  },
  created: function() {



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
