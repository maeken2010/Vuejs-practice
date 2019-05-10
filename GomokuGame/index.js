import board from "./components/board.js";
import store from './store.js'

var app = new Vue({
  el: '#app',
  components: {
    board
  },
  store
})

