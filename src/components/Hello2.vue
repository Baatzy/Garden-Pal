<template>
  <div class="hello2 container">
    <div class="row">
      <div class="col s2">
        <div class="row">
          <div class="col s12">
            <h5 class="center-left">{{ user.firstName }}</h5>
          </div>
          <div class="col s12">
            <img id="profile" class="responsive-img" v-bind:src="user.profilePic"  />
          </div>
          <div class="col s12">
            <a class="waves-effect waves-light btn peach" href="#newpost">New Post</a>

            <div id="newpost" class="modal">
              <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
              </div>
              <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat ">Agree</a>
              </div>
            </div>
          </div>
          <div class="col s12">
            <a class="waves-effect waves-light btn peach" href="#newgarden">New Garden</a>
            <div id="newgarden" class="modal">
              <div class="modal-content">
                <div class="row">
                  <div class="col s12">
                    <h4>Create a new garden</h4>

                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <div class="input-field col s12">
                      <input id="garden" type="text" v-model="gardenName" class="validate">
                      <label for="garden">Garden Name</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <a class=" modal-action modal-close waves-effect waves-green btn-flat" v-on:click="addGarden">Add</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="col s8">
        <div class="row">
          <div class="col s3 offset-s4">

            <h5 class="center-align">Your Feed</h5>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="outer" v-for="post in friendsPosts">
              <div class="row title">
                <div class="col s6">
                  {{ 'Name: ' + post.firstName + ' ' + post.lastName }}
                </div>
                <div class="col s6 left-align">
                  {{ 'Garden Name: ' + post.gardenName }}
                </div>
              </div>
              <div class="row content">
                <div class="col s12">
                  {{ post.content }}
                </div>
              </div>
              <div class="row">
                <div class="col s12 center-align">
                  <img class="responsive-img" v-bind:src="post.photoUrl" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="col s2">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello2',
  data () {
    return {
      user: '',
      friendsPosts: '',
      postText: '',
      postImage: '',
      postName: '',
      gardenName: ''
    }
  },
  mounted: function() {
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
    });
  },
  beforeCreate: function() {
    this.$emit('checkIfLogged');
    this.$http.get('/api/user')
    .then((res) => {
      console.log(res.body);
      this.user = res.body;

      return this.$http.get('/api/friends_posts')
    })
    .then((res) => {
      console.log(res.body);
      this.friendsPosts = res.body
    })
    .catch((err) => {
      console.error(err);
    })

  },
  methods: {
    addGarden: function () {
      if (this.gardenName !== '') {
        console.log('here');
        let newGard = { gardenName: this.gardenName };
        this.$http.post('/api/gardens', newGard)
        .then((res) => {
          Materialize.toast('Garden Added', 2000)
          console.log(res);
          this.gardenName = '';
        })
        .catch((err) => {
          console.error(err);
        })
      } else {
        Materialize.toast('Garden Name Cannot be Blank, Try Again', 2000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.outer {
  padding: 2%;
  border: 1px solid #ffb797;
  border-radius: 3%;
  margin: 1%
}

.peach {
  background-color: #86e2bf;
  width: 100%;
  margin-bottom: 4%;
}

.title {
  border-bottom: 1px solid #ffb797
}

#profile {
  /*width: 70%*/
  border-radius: 4%
}
</style>
