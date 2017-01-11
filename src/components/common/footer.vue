<template>
  <div class="foot">
    <footer class="page-footer color">

     <div class="footer-copyright">
       <div class="container">
       © 2017 Garden Pal
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
  background-color: #269974;
}

li:hover {
  background-color: #ffb797
}
</style>
