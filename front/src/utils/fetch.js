import axios from 'axios'

export default (method, path, data = null) =>
    data
        ? axios({
            method: method,
            url: `${process.env.VUE_APP_BACKEND}${path}`,
            data: data
            // withCredentials: true
        })
        : axios({
            method: method,
            url: `${process.env.VUE_APP_BACKEND}${path}`
            // withCredentials: true
        })
