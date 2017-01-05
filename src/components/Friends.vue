<template>
  <div class="friends container">
    <div class="row">
      <div class="col s12 input-field">

          <input id="last_name" type="text" class="validate" v-model="searchText" v-on:input="searchUsers">
          <label for="last_name">Search for users!</label>
        <!-- <h5>Search for people to follow!</h5><input type="text" v-model="searchText" v-on:input="searchUsers"> -->
      </div>
      <table class="responsive-table">
  <thead>
    <tr>
        <th data-field="id">Pic</th>
        <th data-field="name">Name</th>
        <th data-field="price">Add Friend</th>
    </tr>
  </thead>

  <tbody>
    <tr v-for="friend in users" :key="friend.id">
      <td><img class="responsive-img"  v-bind:src="friend.profilePic" /></td>
      <td>{{ friend.firstName + ' ' + friend.lastName }}</td>
      <td><a class="waves-effect waves-light btn" @click="addFriend(friend.id)">Add to friends!</a>
</td>
    </tr>
  </tbody>
</table>

      <!-- <div class="col s12">
        <ul>
          <li v-for="friend in users" :key="friend.id">
            <img v-bind:src="friend.profilePic" /> Name: {{ friend.firstName + ' ' + friend.lastName }}
          </li>
        </ul>
      </div> -->
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
        if (this.searchText === "") {
          this.users = "";
        }
      })
    },
    addFriend: function (friendId) {
      let friendSend = { friendId }
      this.$http.post('/api/friends', friendSend)
      .then((res) => {
        Materialize.toast(`You have added a user`, 3000)

        console.log(res);
      })
      .catch((err) => {
        Materialize.toast(err.body, 3000)
        console.error(err);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

img {
  max-height: 50px;
}

th {
  width: 30%;
}

</style>
