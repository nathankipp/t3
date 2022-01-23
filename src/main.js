import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import { getWinner, pickSpot } from './js/core';

const BOARD = [[0,0,0],[0,0,0],[0,0,0]];

const store = createStore({
  state() {
    return {
      game: 0,
      board: BOARD,
      turn: 1,
      choices: [],
      done: false,
      results: []
    }
  },
  mutations: {
    play(state, [row, col]) {
      const board = [
        [...state.board[0]],
        [...state.board[1]],
        [...state.board[2]],
      ];
      board[row][col] = state.turn;

      state.board = board;
      state.turn = state.turn * -1;
      state.choices = [...state.choices, [row, col]];

      const winner = getWinner(board);
      const spot = pickSpot(board);
      if (winner || !spot) {
        state.done = true;
      }
      if (!winner && spot && state.turn === -1) {
        this.commit('play', spot);
      } else if (winner || !spot) {
        state.results.push({ winner, choices: state.choices })
      }
    },
    reset(state) {
      const turn = state.game % 2 ? 1 : -1;
      state.game = state.game + 1,
      state.board = BOARD;
      state.turn = turn;
      state.choices = [];
      state.done = false;

      if (turn === -1) {
        this.commit('play', pickSpot(BOARD));
      }
    }
  }
});

createApp(App).use(store).mount('#app')
