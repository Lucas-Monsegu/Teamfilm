import myfetch from '@/utils/fetch'

const state = {
  films: [],
  loading: false,
  rowsPerPage: 10,
  comments: []
}

const mutations = {
  setList (state, films) {
    state.films = films
  },
  setLoading (state, loading) {
    state.loading = loading
  },
  setRowsPerPage (state, rowsPerPage) {
    state.rowsPerPage = rowsPerPage
  },
  setComments (state, comments) {
    state.comments = comments
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
  },
  async getComments (ctx, id) {
    try {
      const res = await myfetch('get', `/get_comments/${id}`)
      ctx.commit('setComments', res.data)
    } catch { }
  }
}

const getters = {
  films (state) {
    return state.films
  },
  loading (state) {
    return state.loading
  },
  rowsPerPage (state) {
    return state.rowsPerPage
  },
  comments (state) {
    return state.comments
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
