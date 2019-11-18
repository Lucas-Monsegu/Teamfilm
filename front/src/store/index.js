import Vue from 'vue'
import Vuex from 'vuex'
import anim from './modules/anim'
import auth from './modules/auth'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    anim
  },
  strict: debug
})
