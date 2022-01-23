<script>
import XorO from './XorO.vue';

const abc = index => ['A','B','C'][index];
const choice = ([row, col]) => `${abc(row)}${col+1}`;

export default {
  name: 'TheBoard',
  components: { XorO },
  methods: {
    xoClass(row, col) {
      return {
        xo: true,
        isOdd: ((row+col)%2===1),
        [abc(row-1)]: true,
        [`_${col}`]: true,
      }
    },
    reset() { this.$store.commit("reset"); },
    report(choices) {
      return choices.map(choice).join(',');
    },
    winner(winner) {
      return winner ? winner > 0 ? "X" : "O" : "Draw";
    }
  }
}
</script>

<template>
  <div class="board-container">
    <h6>Game {{this.$store.state.game + 1}}</h6>
    <div class="the-board">
      <div class="row" v-for="i in 3" :key="i">
        <XorO :class="xoClass(i, 0)" :row="i - 1" :col="0" />
        <XorO :class="xoClass(i, 1)" :row="i - 1" :col="1" />
        <XorO :class="xoClass(i, 2)" :row="i - 1" :col="2" />
      </div>
    </div>
    <button :disabled="!this.$store.state.done" @click="reset">reset</button>
    <div class="results" v-if="this.$store.state.results.length">
      <h6>Results</h6>
      <div v-for="(game, index) in this.$store.state.results" :key="`game-${game}`">
        <div>Game {{index + 1}}: {{winner(game.winner)}}</div>
        <div>{{report(game.choices)}}</div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board-container {
  align-items: center;
  display: flex;
  flex-direction: column;
}
h6 {
  margin: 0;
}
.the-board {
  border: 1px solid grey;
  text-align: center;
  margin-bottom: .25rem;
}
.row {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%%;
}
.xo {
  position: relative;
}
.xo:before,
.xo:after {
  position: absolute;
  top: 1px;
  left: 1px;
  font-size: .3rem;
  color: grey;
}
.xo:after {
  left: .27rem;
}
.isOdd {
  background-color: skyblue;
}
.A:before { content: 'A';}
.B:before { content: 'B';}
.C:before { content: 'C';}
._0:after { content: '1';}
._1:after { content: '2';}
._2:after { content: '3';}
button {
  font-size: 1rem;
  margin-bottom: 1rem;
}
.results div {
  font-size: .75rem;
}
.results div:nth-child(even) {
  font-size: .25rem;
}
</style>
