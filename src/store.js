import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(30, 30, 30, .8), rgba(30, 30, 30, .8)',
    boardType: ['notice', 'used', 'present'],
    drawer: null,
    userId: null,
    userType: '',
    userName: '',
    isChattingListShow: false
    // password: null,
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SIGNIN(state, userData) {
      state.userId = userData.data.user_id;
      state.userName = userData.data.name;
      state.userType = userData.data.user_type;
    },
    SIGNOUT(state) {
      state.userId = '';
      state.userName = '';
      state.userType = '';
    },
    CHATTINGLISTSHOW(state) {
      state.isChattingListShow = !state.isChattingListShow;
    }
  },
  actions: {
    async SIGNIN({ commit }, { userId, password }) {

      const APIURL = process.env.VUE_APP_API_URL;

      const USERDATA = {
        gabia_id: userId,
        password: password
      }

      try {
        let signinRes = await axios.post(`${APIURL}/users/login`, USERDATA);
        router.push('/');
        window.location.reload();
        return commit('SIGNIN', signinRes.data)
      } catch(err) {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    },
    SIGNOUT({ commit }) {
      commit('SIGNOUT')
    },
    CHATTINGLISTSHOW({ commit }) {
      commit('CHATTINGLISTSHOW')
    }
  },
  getters: {
    isSignedIn(state) {
      return state.userId !== '' && state.userId !== null;
    },
    getIsChattingListShow(state) {
      return state.chattingListShow
    }
  },
  plugins: [
    createPersistedState({
      paths: ['userId', 'userType', 'userName']
    })
  ]
})
