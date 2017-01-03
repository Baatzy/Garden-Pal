<template>
  <div class="foot">
    <footer class="page-footer color">

     <div class="footer-copyright">
       <div class="container">
       © 2017 Garden Bro
       </div>
     </div>
   </footer>

  </div>
</template>

<script>


export default {
  name: 'foot',
  data () {
    return {
      msg: ''
    }
  },
  created: function() {



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.color {
  background-color: #86e2bf;
}

li:hover {
  background-color: #ffb797
}
</style>
