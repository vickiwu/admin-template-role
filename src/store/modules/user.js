import { login, logout, getInfo } from '@/api/admin'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    sysconfig: {},
    user: {}
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
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log('%c 🍾 data: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', data)
        const { sessionId, id, realname, avatar } = data.user
        commit('SET_USER', data.user)
        commit('SET_SYSCONFIG', data.sysconfig)
        // 存token
        commit('SET_TOKEN', sessionId)
        // 存用户id
        commit('SET_USERID', id)
        commit('SET_NAME', realname)
        commit('SET_AVATAR', avatar)
        // 缓存token
        setToken(data.user.sessionId)
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
        console.log('%c 🍱 data: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', data)

        if (!data) {
          return reject('Verification failed, please Login again.')
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
      logout(state.token).then(() => {
        removeToken() // 首先移除token
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

