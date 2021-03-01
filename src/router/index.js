import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/', // 首页的设定
    redirect: '/statistical/weeds',
    hidden: true
  },
  {
    path: '/statistical',
    component: Layout,
    redirect: '/statistical/weeds',
    name: 'Statistical',
    meta: { title: '统计分析', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'weeds',
        name: 'WeedsStatistical',
        component: () => import('@/views/statistical/weeds'),
        meta: { title: '杂草分布', icon: 'table' }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/statistical/report'),
        meta: { title: '报表统计', icon: 'tree' }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news/trend',
    name: 'News',
    meta: { title: '新闻中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'trend',
        name: 'Trend',
        component: () => import('@/views/news/trend'),
        meta: { title: '新闻动态', icon: 'table' }
      },
      {
        path: 'management',
        name: 'Management',
        component: () => import('@/views/news/management'),
        meta: { title: '新闻管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/weeds',
    component: Layout,
    redirect: '/weeds/management',
    name: 'Weeds',
    meta: { title: '杂草库', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'management',
        name: 'WeedsManagement',
        component: () => import('@/views/weeds/management'),
        meta: { title: '杂草管理', icon: 'tree' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/weeds/category'),
        meta: { title: '类别管理', icon: 'table' }
      }

    ]
  },

  {
    path: '/expert',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Expert',
        component: () => import('@/views/expert/index'),
        meta: { title: '专家调度', icon: 'form' }
      }
    ]
  },
  {
    path: '/information',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Information',
        component: () => import('@/views/information/index'),
        meta: { title: '资料中心', icon: 'form' }
      }
    ]
  },
  {
    path: '/resource',
    component: Layout,
    redirect: '/resource/account',
    name: 'Resource',
    meta: { title: '资源管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/resource/account'),
        meta: { title: '账户管理', icon: 'tree' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/resource/file'),
        meta: { title: '文件管理', icon: 'table' }
      },
      {
        path: 'space',
        name: 'Space',
        component: () => import('@/views/resource/space'),
        meta: { title: '空间管理', icon: 'table' }
      }

    ]
  },
  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: { title: '系统日志', icon: 'form' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
