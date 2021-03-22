import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // 从cookie中获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // 白名单
router.beforeEach(async(to, from, next) => {
  // 进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 验证用户是否已经登录
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，直接跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name // 验证是否有登录信息
      if (hasGetUserInfo) {
        next()
      } else {
        const hasSetPermission = store.getters.hasSetPermission // 验证是否有登录信息
        if (hasSetPermission) { // 刷新store会丢失 将用户数据缓存到cook中
          next()
        } else {
          try {
            // 获取当前用户的有权限的路由
            await store.dispatch('permission/generateRoutes', store.getters.privGroup)
            next({ ...to, replace: true })
          } catch (error) {
            // 移除本地token 重新登录
            await store.dispatch('user/resetToken')
            Message.error(error || '错误')
            next(`/login`)
            NProgress.done()
          }
        }
      }

      // next()
    }
  } else {
    /* 没有taken*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是免登陆页面，直接跳转
      next()
    } else {
      // 没有权限的页面，跳转到登录页
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条结束
  NProgress.done()
})
