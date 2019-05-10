Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    cells: []
  },

  getters:{
    cells: state => {
      return state.cells
    },
    boardSize: state => {
      return state.cells.length
    }
  },

  mutations: {
    initCells: (state, { boardSize } ) => {
      state.cells = Array.from(new Array(boardSize), () => new Array(boardSize).fill(0))
    },
    changeCell: (state, { n, m, cellColor }) => {
      let a = state.cells[n]
      a[m] = cellColor
      state.cells.splice(n, 1, a)
    }
  }

})

export default store
