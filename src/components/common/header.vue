<template>
  <div class="navi">
    <header>
    <nav>
      <div class="nav-wrapper red">
        <router-link to="/hello" class="brand-logo">Garden Bro</router-link>
        <ul class="right">
          <li><router-link to="/hello">Home</router-link></li>
          <li><router-link to="/hello2">Go to second</router-link></li>
          <li><router-link to="/signup">Sigup!</router-link></li>        </ul>
      </div>
    </nav>
  </header>
  </div>
</template>

<script>




export default {
  name: 'navi',
  data () {
    return {
      msg: '',
      isLogged: false
    }
  },
  created: function() {



  },
  methods: {
    isLoggedIn: function() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
