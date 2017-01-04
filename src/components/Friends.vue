<template>
  <div class="friends container">
    <div class="row">
      <div class="col s12">
        <h5>Search for people to follow!</h5><input type="text" v-model="searchText" v-on:input="searchUsers">
      </div>
      <div class="col s12">
        <ul>
          <li v-for="friend in users" :key="friend.id">
            <img v-bind:src="friend.profilePic" /> Name: {{ friend.firstName + ' ' + friend.lastName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friends',
  data () {
    return {
      user: '',
      users: '',
      searchText: ''
    }
  },
  created: function() {

  },
  beforeCreate: function() {


    this.$emit('checkIfLogged');
    this.$http.get('/api/user')
    .then((res) => {
      console.log(res.body);
      this.user = res.body;

    })


  },
  methods: {
    searchUsers: function () {
      this.$http.get(`/api/friends/${this.searchText}`)
      .then((res) => {
        this.users = res.body;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
