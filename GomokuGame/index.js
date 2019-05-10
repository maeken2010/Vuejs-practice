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
  props: ["boardSize"],
  data: function() {
    return {
      cells: Array.from(new Array(this.boardSize), () => new Array(this.boardSize).fill(0)),
      turn: true,
      isEnd: false
    }
  },
  methods: {
    isGameEnd: function(cells) {
      return isGameEnd(cells)
    },
    changeColor: function(n, m, cell) {
      if (this.isEnd || cell !== 0) return
      const newColor = this.turn ? 1 : 2
      let a = this.cells[n]
      a[m] = newColor
      this.cells.splice(n, 1, a)
      if(this.isGameEnd(this.cells)) {
        console.log("end!")
        this.isEnd = true
        return
      }
      this.turn = !this.turn
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
    </div>
  `
})

var app = new Vue({
  el: '#app'
})

