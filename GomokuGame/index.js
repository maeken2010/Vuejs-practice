import store from './store.js'
import isGameEnd from './gomoku.js'

Vue.component('game-info', {
  props: ['turn'],
  template: `
    <p> current turn : {{ this.turn ? "hoge" : "piyo" }} </p>
  `
})

Vue.component('cell', {
  props: ['color'],
  computed: {
    colorClass: function() {
      return ["white", "red", "blue"][this.color]
    }
  },
  template: '<div :class="this.colorClass"></div>'
})

Vue.component('board', {
  data: function() {
    return {
      turn: true,
      isEnd: false,
      boardSizeList: [5, 10, 20],
      pickedSize: 10
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'cells'
    ])
  },
  created: function() {
    this.initCells({ boardSize: this.pickedSize })
  },
  methods: {
    ...Vuex.mapMutations([
      'initCells',
      'changeCell'
    ]),
    initGame: function() {
      this.isEnd = false
      this.turn = true
    },
    isGameEnd: function(cells) {
      return isGameEnd(cells)
    },
    changeColor: function(n, m, cell) {
      if (this.isEnd || cell !== 0) return
      const cellColor = this.turn ? 1 : 2

      this.changeCell( { n, m, cellColor } )

      if(this.isGameEnd(this.cells)) {
        console.log("end!")
        this.isEnd = true
        return
      }
      this.turn = !this.turn
    }
  },
  watch: {
    pickedSize: function (val, oldVal) {
      this.initGame()
      this.initCells({ boardSize: val })
    }
  },
  template: `
    <div>
      <div class="board">
        <div v-for="(celllist, n) in this.cells">
          <div v-for="(cell, m) in celllist">
            <cell class="cell" :color="cell" @click.prevent.native="changeColor(n, m, cell)"></cell>
          </div>
        </div>
      </div>
      <game-info :turn="this.turn"></game-info>
      <div v-for="s in this.boardSizeList">
        <input type="radio" :id="'radio' + s" :value="s" v-model="pickedSize">
        <label :for="s">{{ s }}</label>
        <br>
      </div>
      <p> current size : {{ pickedSize }} </p>
    </div>
  `
})

var app = new Vue({
  el: '#app',
  store
})

