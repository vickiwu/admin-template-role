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
  generateRoutes({ commit }, auth) {
    const { utype } = auth
    return new Promise(resolve => {
      const arr1 = ['统计分析']

      if (utype === 1) {
        arr1.push('资源管理')
      } else if (utype === 2) {
        arr1.push('调度中心')
      } else if (utype === 3) {
        arr1.push('有害生物录入')
        arr1.push('专家研判')
        arr1.push('资料中心')
      } else if (utype === 4) {
        arr1.push('有害生物录入')
        arr1.push('资料中心')
      } else if (utype === 5) {
        arr1.push('系统日志')
      } else if (utype === 6) {
        // 杂草库—杂草检索
        // 专家研判—研判记录
        // 资料中心—资料检索
        arr1.push('有害生物录入')
        arr1.push('专家研判')
        arr1.push('资料中心')
        arr1.push('杂草检索')
        arr1.push('研判记录')
        arr1.push('资料检索')
      }

      // 权限判断
      const routes = setRoutes(constantRoutes, arr1, utype)
      resolve(routes)
      commit('SET_PERMISSION_STATE', true)
    })
  },
  resetPermissionState({ commit }) {
    commit('SET_PERMISSION_STATE', false)
  }
}

export function setRoutes(constantRoutes, priv, utype) {
  const arr = []
  constantRoutes.forEach(element => {
    if (!element.meta || element.meta && element.meta.title === '统计分析') {
      arr.push(element)
    } else {
      if (!priv.includes(element.meta && element.meta.title)) {
        element.hidden = true
      } else {
        element.hidden = false
        if (utype === 6) {
          if (element.meta.title === '有害生物录入' ||
          element.meta.title === '专家研判' ||
          element.meta.title === '资料中心'
          ) {
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

