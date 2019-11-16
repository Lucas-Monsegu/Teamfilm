import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '@/utils/fetch'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    auth (state, user) {
      state.user = user
    },
    logout (state) {
      state.user = {}
    }
  },
  actions: {
    auth (ctx) {
      fetch('get', '/auth')
        .then(res => {
          ctx.commit('auth', res.data)
        })
        .catch(ctx.commit('logout'))
    },
    logout (ctx) {
      fetch('get', '/logout')
        .then(ctx.commit('logout'))
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})
