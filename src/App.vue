<template>
  <div id="app">
    <navi :is-logged-in="this.isLoggedIn" v-on:checkIfLogged="checkIfLogged"></navi>
    <main class="grey lighten-5">
      <router-view v-on:checkIfLogged="checkIfLogged"></router-view>
    </main>
    <foot class="grey lighten-5"></foot>
  </div>
</template>

<script>


import foot from './components/common/footer'
import navi from './components/common/header'

export default {
  name: 'app',
  components: {
    navi,
    foot
  },
  methods: {

  },
  data () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    checkIfLogged: function () {
      this.$http.get('/api/token')
      .then((res) => {
        console.log(res);
        this.isLoggedIn = res.body
      })
    }
  },
  events: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  flex: 1 0 auto;

}

body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
  background-color:
}
</style>
