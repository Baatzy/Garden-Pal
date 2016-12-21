<template>
  <div id="app">

      <navi>

      </navi>

    <main>
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

}
</style>
