<script>
import XorO from './XorO.vue';

export default {
  name: 'TheBoard',
  components: { XorO },
  methods: {
    reset() { this.$store.commit("reset"); }
  }
}
</script>

<template>
  <div class="the-board">
    <div v-for="i in 3" :key="i">
      <XorO :row="i - 1" :col="0" />
      <XorO :row="i - 1" :col="1" />
      <XorO :row="i - 1" :col="2" />
    </div>
    <button v-if="this.$store.state.done" @click="reset">reset</button>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.the-board {
  text-align: center;
}
.the-board > div {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%%;
}
button {
  font-size: 1rem;
}
</style>
