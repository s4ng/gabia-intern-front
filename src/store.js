import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(30, 30, 30, .8), rgba(30, 30, 30, .8)',
    drawer: null,
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  }
})
