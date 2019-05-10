Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: 'Hi'
  },

  getters:{
    message(state) {
      return state.message
    }
  },

  mutations: {
    setMessage(state, payload){
      state.message = payload.message
    }
  }

})

export default store
