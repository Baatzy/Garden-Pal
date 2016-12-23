<template>
  <div id="app">
    <navi></navi>
    <router-view></router-view>
    <foot></foot>
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
  box-sizing: border-box;
  width: 100%;

}
</style>
