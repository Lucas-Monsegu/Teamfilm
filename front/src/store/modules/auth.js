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
        ctx.commit('addSnack', {
          text: 'Successfully logged in'
        })
      })
      .catch(console.error) // eslint-disable-line no-console
  },
  logout (ctx, intended) {
    myfetch('get', '/logout')
      .then(_ => {
        if (ctx.getters.loggedIn) {
          ctx.commit('addSnack',
            intended
              ? {
                text: 'Successfully logged out'
              }
              : {
                text: 'You have been logged out',
                color: 'info'
              })
        }
        ctx.commit('logout')
      })
      .catch(console.error) // eslint-disable-line no-console
  }
}

const getters = {
  user (state) {
    return state.user
  },
  loggedIn (state) {
    return state.user && Object.keys(state.user).length > 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
