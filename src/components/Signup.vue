<template>
  <div class="Signup valign-wrapper">
    <div class="container valign">
    <div class="row">
      <div class="col s4 offset-s4 ">
        <div class="row">
          <div class="col s4 offset-s3">
            <h3>Signup!</h3>
          </div>
        </div>
          <div class="row ">
            <form class="col s12 ">
              <div class="row">
                <div class="input-field col s6">
                  <input id="first_name" v-model="firstName" type="text" class="validate">
                  <label for="first_name">First Name</label>
                </div>
                <div class="input-field col s6">
                  <input id="last_name" v-model="lastName" type="text" class="validate">
                  <label for="last_name">Last Name</label>
                </div>
              </div>
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
                <div class="input-field col s12">
                  <input id="email" v-model="email" type="email" class="validate">
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="file-field input-field">
                <div class="btn">
                  <span>Profile Picture</span>
                  <input type="file">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
              <div class="row">
                <div class="col s4 offset-s4">
                  <button class="btn waves-effect waves-light center-align" v-on:click="signUp" type="submit" name="action">Submit
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      msg: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  },
  beforeCreate: function() {


  },
  methods: {
    signUp: function (e) {
      e.preventDefault();
      this.$http.post('/api/users',{
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password
      }).then((res) => {
        console.log(res);
      } )
      console.log('swag');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
