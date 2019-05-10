Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    cells: [],
    isEnd: false
  },

  getters:{
    isEnd: state => {
      return state.isEnd
    },
    cells: state => {
      return state.cells
    },
    boardSize: state => {
      return state.cells.length
    }
  },

  mutations: {
    changeGameEnd: state => {
      state.isEnd = true
    },
    initCells: (state, { boardSize } ) => {
      state.cells = Array.from(new Array(boardSize), () => new Array(boardSize).fill(0))
      state.isEnd = false
    },
    changeCell: (state, { n, m, cellColor }) => {
      let a = state.cells[n]
      a[m] = cellColor
      state.cells.splice(n, 1, a)
    }
  }

})

export default store
