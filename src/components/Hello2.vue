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
            <a class="waves-effect waves-light btn peach" href="#newpost" v-on:click="updateGardens">New Post</a>

            <div id="newpost" class="modal">
              <div class="modal-content">
                <div class="row">
                  <div class="col s6">
                    <h4>Create a new post</h4>
                  </div>
                  <div class="col s6">
                    <div class="input-field col s12 ">
                      <select id="garden_select" class="browser-default" v-model="selectedGardenPost">
                        <option value="" disabled>Select Garden</option>
                        <option v-for="garden in this.usersGardens" v-bind:value="garden.id">{{ garden.name }}</option>

                      </select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <form>
                    <div class="file-field input-field col s12">
                      <div class="btn">
                        <span>Picture</span>
                        <input type="file" v-on:change="postUpdatePhoto">
                      </div>
                      <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                      </div>
                    </div>
                    <div class="row">
                      <form class="col s12">
                        <div class="row">
                          <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea" v-model="postContent"></textarea>
                            <label for="textarea1">Write Garden Post Here!</label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat" v-on:click="submitNewPost">Agree</a>
                <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>

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
      gardenName: '',
      usersGardens: [],
      selectedGardenPost: '',
      postPhoto: '',
      postContent: '',
    }
  },

  mounted: function() {
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal').modal();
      $('select').material_select();
    });

    this.$http.get('/api/friends_posts')
    .then((res) => {
      this.friendsPosts = res.body

    })
    .catch((err) => {
      console.error(err);
    })
  },

  beforeCreate: function() {
    this.$emit('checkIfLogged');

    this.$http.get('/api/user')
    .then((res) => {
      this.user = res.body;

      return this.$http.get('/api/friends_posts')
    })
    .then((res) => {
      this.friendsPosts = res.body
      this.selectedGardenPost = res.body[0].id
    })
    .catch((err) => {
      console.error(err);
    })

    this.$http.get('/api/user_gardens')
    .then((res) => {
      this.usersGardens = res.body;
      $(document).ready(function() {
        $('select').material_select();
      });

    })
    .catch((err) => {
      console.error(err);
    })

  },
  created: function () {

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
    },

    updateGardens: function () {
      this.$http.get('/api/user_gardens')
      .then((res) => {
        console.log(res);
        this.usersGardens = res.body;
        $(document).ready(function() {
          $('select').material_select();
        });

      })
      .catch((err) => {
        console.error(err);
      })
    },
    postUpdatePhoto: function (e) {
      this.postPhoto = e.target.files[0];
      console.log(this.postPhoto);
    },
    submitNewPost: function () {
      let formData = new FormData();

      formData.append('gardenId', this.selectedGardenPost);
      formData.append('content', this.postContent);
      formData.append('photo', this.postPhoto);

      console.log(formData);

      // Materialize.toast('Creating Account, Please Wait...', 6000)
      this.$http.post('/api/users_post', formData
      ).then((res) => {
      })
      .then(() => {
      })
      .catch((err) => {
        Materialize.toast(err.body, 4000)
        console.log(err);
      })
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
