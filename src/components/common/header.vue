<template>
  <div class="navi">
    <header>
      <nav class="color">
        <div class="nav-wrapper container">
          <router-link to="/" class="brand-logo ">Garden Bro</router-link>
          <ul class="right">
            <li v-if="isLoggedIn === false"><router-link to="/">Home</router-link></li>
            <li v-if="isLoggedIn === true"><router-link to="/hello2">Your Profile</router-link></li>
            <li v-if="isLoggedIn === true"><router-link to="/friends">Find Friends</router-link></li>
            <li v-if="isLoggedIn === false"><router-link to="/login">Login/Signup</router-link></li>
            <li v-else-if="isLoggedIn === true"><a v-on:click="logout">Logout</a></li>
          </ul>
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
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    }
  },
  created: function() {
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });



  },
  props: [
    'isLoggedIn'

  ],
  methods: {
    logout: function () {
      this.$http.delete('/api/token')
      .then((res) => {
        this.$emit('checkIfLogged');
        this.$router.push('/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.color {
  background-color: #86e2bf;
}

li:hover {
  background-color: #ffb797
}


</style>
