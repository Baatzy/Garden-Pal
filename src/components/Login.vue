<template>
  <div class="Login valign-wrapper">
    <div class="container valign">
    <div class="row">
      <div class="col s4 offset-s4 ">
        <div class="row">
          <div class="col s4 offset-s3">
            <h3>Login!</h3>
          </div>
        </div>
          <div class="row ">
            <form class="col s12 ">
              <div class="row">
                <div class="input-field col s12">
                  <input id="username" v-model="username" type="text" class="validate">
                  <label for="username">Username</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password" v-model="password" type="password" class="validate">
                  <label for="password">Password</label>
                </div>
              </div>
              <div class="row">
                <div class="col s4 offset-s4">
                  <button class="btn waves-effect waves-light center-align" v-on:click="login" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col s12">
                <h6>Dont have an account? <router-link to="/signup">Signup!</router-link></h6>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  beforeCreate: function() {
    this.$emit('checkIfLogged');


  },
  methods: {
    login: function (e) {
      e.preventDefault();
      this.$http.post('/api/token',{
        username: this.username,
        password: this.password
      }).then((res) => {
        this.$emit('checkIfLogged');
        this.username = '';
        this.password = '';
      })
      .then(() => {
        this.$router.push('/hello2');

      })
      .catch((err) => {
        Materialize.toast(err.body, 4000)

        console.error(err);
        this.$emit('checkIfLogged')

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
