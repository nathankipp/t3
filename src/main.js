import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import { getWinner, pickSpot } from './js/core';

const BOARD = [[0,0,0],[0,0,0],[0,0,0]];

const store = createStore({
  state() {
    return {
      board: BOARD,
      turn: 1,
      done: false,
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

      const winner = getWinner(board);
      const spot = pickSpot(board);
      if (winner || !spot) {
        state.done = true;
      }
      if (!winner && spot && state.turn === -1) {
        this.commit('play', spot);
      }
    },
    reset(state) {
      state.board = BOARD;
      state.turn = 1;
      state.done = false;
    }
  }
});

createApp(App).use(store).mount('#app')
