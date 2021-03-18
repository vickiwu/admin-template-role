import { login, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getUser, setUser, removeUser, getSysConfig, setSysConfig, removeSysConfig } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: getUserId(),
    sysconfig: getSysConfig() ? JSON.parse(getSysConfig()) : '',
    user: getUser() ? JSON.parse(getUser()) : ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => { // 重置状态
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_SYSCONFIG: (state, sysconfig) => {
    state.sysconfig = sysconfig
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        const { sessionId, id } = data.user
        // store 存token
        commit('SET_USER', data.user)
        commit('SET_SYSCONFIG', data.sysconfig)
        commit('SET_TOKEN', sessionId)
        commit('SET_USERID', id) // 存用户id
        // 缓存token等登录信息到cook中
        setToken(sessionId)
        setUserId(id)
        setUser(data.user)
        setSysConfig(data.sysconfig)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.token, 'sss')
      getInfo({ id: state.userId }).then(response => {
        const { data } = response
        if (!data) {
          return reject('登录失效，请重新登录')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // 首先移除token
        removeUserId()
        removeUser()
        removeSysConfig()

        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE') // 重置状态
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

