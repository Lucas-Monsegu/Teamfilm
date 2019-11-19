const state = {
  animteamfilm: false,
  animcheck: false,
  animfail: false
}

const mutations = {
  animteamfilm (state, b) {
    state.animteamfilm = b
  },
  animcheck (state, b) {
    state.animcheck = b
  },
  animfail (state, b) {
    state.animfail = b
  }
}

const actions = {
}

const getters = {
  animteamfilm (state) {
    return state.animteamfilm
  },
  animcheck (state) {
    return state.animcheck
  },
  animfail (state) {
    return state.animfail
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
