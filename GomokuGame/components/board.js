import isGameEnd from '../gomoku.js'
import cell from './cell.js'
import gameInfo from './gameInfo.js'

export default {
  components: {
    cell,
    gameInfo
  },
  data: function() {
    return {
      turn: true,
      boardSizeList: [5, 10, 20],
      pickedSize: 10
    }
  },
  computed: {
    ...Vuex.mapGetters([
      'isEnd',
      'cells'
    ])
  },
  created: function() {
    this.initCells({ boardSize: this.pickedSize })
  },
  methods: {
    ...Vuex.mapMutations([
      'changeGameEnd',
      'initCells',
      'changeCell'
    ]),
    initGame: function(size) {
      this.initCells({ boardSize: size })
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
        this.changeGameEnd()
        return
      }
      this.turn = !this.turn
    }
  },
  watch: {
    pickedSize: function (val, oldVal) {
      this.initGame(val)
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
}