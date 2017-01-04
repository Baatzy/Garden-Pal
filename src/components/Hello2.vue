<template>
  <div class="hello2 container">
    <div class="row">
      <div class="col s3">
        <h5>Welcome {{ user.firstName }}</h5>
        <img v-bind:src="user.profilePic"  />
      </div>
      <div class="col s6">
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3"><a href="#test1">Test 1</a></li>
              <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li>
              <li class="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
              <li class="tab col s3"><a href="#test4">Test 4</a></li>
            </ul>
          </div>
          <div id="test1" class="col s12">Test 1sdfasdfsdafsa</div>
          <div id="test2" class="col s12">Test 2</div>
          <div id="test3" class="col s12">Test 3</div>
          <div id="test4" class="col s12">Test 4</div>
        </div>
      </div>
      <div class="col s3">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello2',
  data () {
    return {
      user: ''
    }
  },
  created: function() {
    // $(document).ready(function(){
    //   $('ul.tabs').tabs();
    // });
  },
  beforeCreate: function() {
    // $(document).ready(function(){
    //   $('ul.tabs').tabs();
    // });

    this.$emit('checkIfLogged');
    this.$http.get('/api/user')
    .then((res) => {
      console.log(res.body);
      this.user = res.body;

    })


  },
  methods: {
    howToPlant: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
