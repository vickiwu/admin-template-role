import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (!config.data) {
        config.data = { JSSID: getToken() }
      } else {
        config.data.JSSID = getToken()
      }
    }

    if (config.method === 'post') {
      if (!(config.data instanceof FormData)) {
        config.data = qs.stringify(config.data)
      }
    }
    if (store.getters.token) {
      config.headers['JSSID'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.state !== 1) {
      Message({
        message: res.data.msg || '错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.data.msg || '错误')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
