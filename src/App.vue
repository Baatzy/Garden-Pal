<template>
  <div id="app">

      <navi>

      </navi>

    <main>
      <!-- <hello></hello> -->
      <!-- <hello2></hello2> -->
      <router-view></router-view>
    </main>
    <footer><foot></foot></footer>
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
