<template>
  <div class="hello">
    <div class="section no-pad-bot" id="index-banner">
      <div class="container">
        <br><br>
        <h1 class="header center accent-text">Garden Bro</h1>
        <div class="row center">
          <h5 class="header col s12 light">A place to share your garden with your friends. </h5>
          <h5 class="header col s12 light">Showoff your garden, post updates as it grows.</h5>
          <h5 class="header col s12 light">Follow your friends and grow together!</h5>
        </div>
        <div class="row center">
          <router-link to="/signup" class="btn-large waves-effect waves-light accent">Get Growing</router-link>
        </div>
        <br><br>
      </div>
    </div>
    <div class="container ">
      <div class="section">
        <div class="row">
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center"><i class="material-icons">nature_people</i></h2>
              <h5 class="center">Share your garden</h5>
              <p class="light">Post pictures of your garden at every step! Let people know what your planting, when your planting,
                 and how it well it grew! Have a bug problem? Post about it. Everything go perfect? Post about it! Post updates whenever you want, about anything you want!</p>
            </div>
          </div>
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center"><i class="material-icons">group</i></h2>
              <h5 class="center">Follow your friends</h5>
              <p class="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
            </div>
          </div>
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center"><i class="material-icons">settings</i></h2>
              <h5 class="center">Easy to use</h5>
              <p class="light">Thestral dirigible plums, Viktor Krum hexed memory charm Animagus Invisibility Cloak three-headed Dog. Half-Blood Prince Invisibility Cloak cauldron cakes, hiya Harry! Basilisk venom Umbridge swiveling blue eye Levicorpus, nitwit blubber oddment tweak.</p>
            </div>
          </div>
        </div>
      </div>
      <br><br>
      <div class="section">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: ''
    }
  },
  beforeMount: function() {
    this.$emit('checkIfLogged');
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.accent-text {
  color: #ffb797
}

.accent {
  background-color: #ffb797
}

</style>
