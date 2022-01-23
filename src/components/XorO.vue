<template>
  <span v-if="isX">X</span>
  <span v-else-if="isO">O</span>
  <span v-else>
    <button @click="play(row, col)" :disabled="disabled" />
  </span>
</template>

<script>
const getVal = ({ $store: { state }, row, col }) => state.board[row][col];
export default {
  name: 'XorO',
  props: {
    row: Number,
    col: Number,
  },
  computed: {
    isX() { return getVal(this) === 1; },
    isO() { return getVal(this) === -1; },
    disabled() { return this.$store.state.done; }
  },
  methods: {
    play(row, col) {
      this.$store.commit('play', [row, col]);
    }
  }
}
</script>

<style scoped>
span {
  align-items: center;
  display: flex;
  height: 2.25rem;
  justify-content: center;
  padding: 0rem;
  width: 2.25rem;
}
button {
  background-color: unset;
  border: none;
  color: grey;
  cursor: pointer;
  height: 100%;
  width: 100%;
}
</style>
