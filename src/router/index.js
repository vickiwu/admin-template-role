import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout布局页面 */
import Layout from '@/layout'

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
        path: 'addNews',
        name: 'AddNews',
        // hidden: true,
        component: () => import('@/views/news/addNews'),
        meta: { title: '新闻发布', icon: 'tree' }
      },
      {
        path: 'newsDetail',
        name: 'NewsDetail',
        hidden: true,
        component: () => import('@/views/news/news'),
        meta: { title: '新闻内容', icon: 'tree' }
      },

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
        path: 'addWeeds',
        name: 'AddWeeds',
        // hidden: true,
        component: () => import('@/views/weeds/addWeeds'),
        meta: { title: '杂草录入', icon: 'tree' }
      },
      {
        path: 'showWeeds',
        name: 'ShowWeeds',
        hidden: true,
        component: () => import('@/views/weeds/showWeeds'),
        meta: { title: '杂草详情', icon: 'tree' }
      },
      {
        path: 'management',
        name: 'WeedsManagement',
        component: () => import('@/views/weeds/management'),
        meta: { title: '杂草管理', icon: 'tree' }
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('@/views/weeds/search'),
        meta: { title: '杂草检索', icon: 'tree' }
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
    redirect: '/expert/index',
    name: 'ExpertIndex',
    meta: { title: '专家中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Expert',
        component: () => import('@/views/expert/index'),
        meta: { title: '专家调度', icon: 'form' }
      },
      {
        path: 'addExpert',
        name: 'AddExpert',
        // hidden: true,
        component: () => import('@/views/expert/addExpert'),
        meta: { title: '专家录入', icon: 'tree' }
      },
      {
        path: 'management',
        name: 'ExpertManagement',
        // hidden: true,
        component: () => import('@/views/expert/management'),
        meta: { title: '专家管理', icon: 'tree' }
      }
      // {
      //   path: 'set',
      //   name: 'ExpertSet',
      //   // hidden: true,
      //   component: () => import('@/views/expert/setExpert'),
      //   meta: { title: '调度管理', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/information',
    component: Layout,
    redirect: '/information/index',
    name: 'InformationIndex',
    meta: { title: '资料中心', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Information',
        component: () => import('@/views/information/index'),
        meta: { title: '资料管理', icon: 'form' }
      },
      {
        path: 'searchInformation',
        name: 'InformationSearch',
        // hidden: true,
        component: () => import('@/views/information/search'),
        meta: { title: '资料检索', icon: 'tree' }
      },
      {
        path: 'addInformation',
        name: 'InformationAdd',
        component: () => import('@/views/information/addInfo'),
        meta: { title: '资料录入', icon: 'tree' }
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
        path: 'syncAccount',
        name: 'SyncAccount',
        // hidden: true,
        component: () => import('@/views/resource/syncAccount'),
        meta: { title: '账户同步', icon: 'tree' }
      },
      {
        path: 'roles',
        name: 'AccountRoles',
        // hidden: true,
        component: () => import('@/views/resource/roles'),
        meta: { title: '权限设置', icon: 'tree' }
      },
      {
        path: 'addAccount',
        name: 'AddAccount',
        // hidden: true,
        component: () => import('@/views/resource/addAccount'),
        meta: { title: '账户新增', icon: 'tree' }
      },
      {
        path: 'editAccount',
        name: 'EditAccount',
        hidden: true,
        component: () => import('@/views/resource/editAccount'),
        meta: { title: '账户编辑', icon: 'tree' }
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
    path: '/expertJudge',
    component: Layout,
    redirect: '/expertJudge/index',
    name: 'ExpertJudgeIndex',
    meta: { title: '专家研判', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'ExpertJudge',
        component: () => import('@/views/expertJudge/index'),
        meta: { title: '研判任务', icon: 'form' }
      },
      {
        path: 'judge',
        name: 'Judge',
        hidden: true,
        component: () => import('@/views/expertJudge/judge'),
        meta: { title: '执行研判', icon: 'form' }
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('@/views/expertJudge/records'),
        meta: { title: '研判记录', icon: 'tree' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    meta: { title: '系统日志', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: { title: '系统日志', icon: 'form' }
      }
    ]
  },
  // 404 页面
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置 router
}

export default router
