import myfetch from '@/utils/fetch'

const state = {
  user: null
}

const mutations = {
  auth (state, user) {
    state.user = user
  },

  logout (state) {
    state.user = {}
  }
}

const actions = {
  auth (ctx) {
    myfetch('get', '/auth')
      .then(res => {
        ctx.commit('auth', res.data)
      })
      .catch(_ => console.error)
  },
  logout (ctx) {
    myfetch('get', '/logout')
      .then(ctx.commit('logout'))
      .catch(_ => console.error)
  }
}

const getters = {
  user (state) {
    return state.user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
