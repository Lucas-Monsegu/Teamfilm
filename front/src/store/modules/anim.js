const state = {
  animteamfilm: false,
  animcheck: false
}

const mutations = {
  animteamfilm (state, b) {
    state.animteamfilm = b
  },
  animcheck (state, b) {
    state.animcheck = b
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
