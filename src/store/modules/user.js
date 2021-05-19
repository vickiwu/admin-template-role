import { login, logout, getInfo, loginBySessionId } from '@/api/admin'
import { getToken, setToken, removeToken, getUserId, setUserId,
  removeUserId, getUser, setUser, removeUser, getSysConfig,
  setSysConfig, removeSysConfig, removeUserPriv, getUserPriv, setUserPriv } from '@/utils/auth'
import { resetRouter } from '@/router'
import sha256 from 'sha256'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: getUserId(),
    sysconfig: getSysConfig() ? JSON.parse(getSysConfig()) : '',
    user: getUser() ? JSON.parse(getUser()) : '',
    privGroup: getUserPriv()
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
  SET_USER_AVATAR: (state, url) => {
    state.user.avatar = url
  },
  SET_SYSCONFIG: (state, sysconfig) => {
    state.sysconfig = sysconfig
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_PRIV: (state, privGroup) => {
    state.privGroup = privGroup
  }
}

const actions = {
  setUserAvatar({ commit }, url) {
    commit('SET_USER_AVATAR', url)
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: sha256(password) }).then(response => {
        const { data } = response
        const { sessionId, id } = data.user
        // store 存token
        commit('SET_USER', data.user)
        commit('SET_SYSCONFIG', data.sysconfig)
        commit('SET_TOKEN', sessionId)
        commit('SET_USERID', id) // 存用户id
        // 存当前用户的权限
        commit('SET_PRIV', data.user.privGroup)
        // 缓存token等登录信息到cook中
        setToken(sessionId)
        setUserId(id)
        setUser(data.user)
        setSysConfig(data.sysconfig)
        setUserPriv(data.user.privGroup)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户通过sessionId登陆
  loginBySessionId({ commit }, mysessionId) {
    return new Promise((resolve, reject) => {
      loginBySessionId({ sessionId: mysessionId }).then(response => {
        const { data } = response
        const { sessionId, id } = data.user
        // store 存token
        commit('SET_USER', data.user)
        commit('SET_SYSCONFIG', data.sysconfig)
        commit('SET_TOKEN', sessionId)
        commit('SET_USERID', id) // 存用户id
        // 存当前用户的权限
        commit('SET_PRIV', data.user.privGroup)
        // 缓存token等登录信息到cook中
        setToken(sessionId)
        setUserId(id)
        setUser(data.user)
        setSysConfig(data.sysconfig)
        setUserPriv(data.user.privGroup)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息 重新存 用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ id: state.userId }).then(response => {
        const { data } = response
        if (!data) {
          return reject('登录失效，请重新登录')
        }
        commit('SET_USER', data.user)
        commit('SET_SYSCONFIG', data.sysconfig)
        setUser(data.user)
        setSysConfig(data.sysconfig)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // 首先移除token
        removeUserId()
        removeUser()
        removeSysConfig()
        removeUserPriv()

        resetRouter()
        commit('RESET_STATE')
        dispatch('permission/resetPermissionState', {}, { root: true })
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

