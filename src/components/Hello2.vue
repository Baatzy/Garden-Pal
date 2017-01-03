<template>
  <div class="hello2 container">
    <div class="row">
      <div class="col s12">
        <h3></h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello2',
  data () {
    return {
      msg: ''
    }
  },
  beforeCreate: function() {
    this.$emit('checkIfLogged');


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
