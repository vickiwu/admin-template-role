import { constantRoutes } from '@/router'

const state = {
  hasSetPermission: false,
  routes: []
}

const mutations = {
  SET_PERMISSION_STATE: (state, isSet) => {
    // eslint-disable-next-line no-prototype-builtins
    state.hasSetPermission = isSet
  }
}

const actions = {
  generateRoutes({ commit }, priv) {
    priv = (typeof priv === 'string' ? JSON.parse(priv) : priv)
    return new Promise(resolve => {
      const arr1 = []

      priv.forEach(element => {
        arr1.push(element.pageName)
      })
      if (arr1.includes('账户管理')) {
        arr1.push('权限设置')
        arr1.push('账户新增')
      }
      if (arr1.includes('账户管理') || arr1.includes('账户同步') || arr1.includes('文件管理') || arr1.includes('空间管理')) {
        arr1.push('资源管理')
      }
      if (!(priv.length === 1 && priv[0].pageName === '*')) {
        const routes = setRoutes(constantRoutes, arr1)
        resolve(routes)
      } else {
        const routes = resetRoutes(constantRoutes)
        resolve(routes)
      }
      commit('SET_PERMISSION_STATE', true)
    })
  },
  resetPermissionState({ commit }) {
    commit('SET_PERMISSION_STATE', false)
  }
}

export function resetRoutes(constantRoutes) {
  // constantRoutes = routes
  constantRoutes.forEach(element => {
    if (element.meta) {
      if (element.meta.title === '统计分析' ||
      element.meta.title === '新闻中心' ||
      element.meta.title === '杂草库' ||
      element.meta.title === '专家中心' ||
      element.meta.title === '资料中心' ||
      element.meta.title === '系统日志' ||
      element.meta.title === '专家研判'
      ) {
        element.hidden = false
      } else if (element.meta.title === '资源管理') {
        element.hidden = false
        element.children.forEach(item => {
          item.hidden = false
        })
      }
    }
  })
}

export function setRoutes(constantRoutes, priv) {
  const arr = []
  constantRoutes.forEach(element => {
    if (!element.meta || element.meta && element.meta.title === '统计分析') {
      arr.push(element)
    } else {
      if (!priv.includes(element.meta && element.meta.title)) {
        element.hidden = true
      } else {
        element.hidden = false
        if (element.meta.title === '资源管理') {
          const child = []
          element.children.forEach(item => {
            if (!priv.includes(item.meta && item.meta.title)) {
              item.hidden = true
            } else {
              item.hidden = false
            }
            child.push(item)
          })
          element.children = child
        }
      }
      arr.push(element)
    }
  })
  return arr
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

