import myfetch from '@/utils/fetch'

const state = {
  films: [],
  loading: false
}

const mutations = {
  setList (state, films) {
    state.films = films
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}

const actions = {
  async getList (ctx) {
    ctx.commit('setLoading', true)
    try {
      const res = await myfetch('get', '/get_list')
      ctx.commit('setList', res.data)
    } catch (error) { } finally {
      ctx.commit('setLoading', false)
    }
  }
}

const getters = {
  films (state) {
    return state.films
  },
  loading (state) {
    return state.loading
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
