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
      cells: Array.from(new Array(10), () => new Array(10).fill(0)),
      turn: true
    }
  },
  methods: {
    isEndGame: function() {
      // ゲーム終了判定を書く
    },
    changeColor: function(n, m, cell) {
      if (cell !== 0) return
      const newColor = this.turn ? 1 : 2
      let a = this.cells[n]
      a[m] = newColor
      this.cells.splice(n, 1, a)
      if(this.isEndGame()) {
        console.log("end!")
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

