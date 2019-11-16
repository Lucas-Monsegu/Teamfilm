import axios from 'axios'

export default (method, path) => axios({
  method: method,
  url: `${process.env.VUE_APP_BACKEND}${path}`
})
