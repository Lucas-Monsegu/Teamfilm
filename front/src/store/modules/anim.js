const state = {
    animteamfilm: false,
    animcheck: false,
    animfail: false,
    delete: false
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
    },
    animdelete (state, b) {
        state.delete = b
    }
}

const actions = {}

const getters = {
    animteamfilm (state) {
        return state.animteamfilm
    },
    animcheck (state) {
        return state.animcheck
    },
    animfail (state) {
        return state.animfail
    },
    animdelete (state) {
        return state.delete
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
