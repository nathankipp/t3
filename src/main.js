import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'

const store = createStore({
  state() {
    return {
      board: [[0,0,0],[0,0,0],[0,0,0]],
      turn: 1,
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
    }
  }
});

createApp(App).use(store).mount('#app')
