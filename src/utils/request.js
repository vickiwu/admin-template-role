import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, removeUserId, removeUser, removeSysConfig } from '@/utils/auth'
const GlobalConfig = require('@/globalConfig')

// 创建axios实例
const service = axios.create({
  baseURL: `http://${GlobalConfig.serverIP}:${GlobalConfig.serverPort}`, // url = base url + request url
  timeout: 15000 // request timeout
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
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.state !== 1) {
      if (res.data.msg === '您还没有登录') {
        // 移除token 重置到登录页
        removeToken() // 首先移除token
        removeUserId()
        removeUser()
        removeSysConfig()
        MessageBox.alert(res.data.msg, {
          confirmButtonText: '确定',
          callback: () => { // 点击确定后返回登录页
            location.reload()
          }
        })
      } else {
        MessageBox.alert(res.data.msg || '错误', {
          confirmButtonText: '确定'
        })
      }
      return Promise.reject(res.data.msg || '错误')
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
