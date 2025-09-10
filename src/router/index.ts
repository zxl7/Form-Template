/**
 * 路由配置文件
 * 定义应用的路由结构和页面导航
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * 路由配置接口 - 定义单个路由的结构
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: '首页 - 表单库系统',
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // 路由懒加载，提高首屏加载性能
    component: () => import('@/pages/About.vue'),
    meta: {
      title: '关于我们 - 表单库系统',
      requiresAuth: false
    }
  },
  // 404页面路由 - 捕获所有未匹配的路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      title: '页面未找到 - 表单库系统',
      requiresAuth: false
    }
  }
]

/**
 * 创建路由实例
 * @description 配置路由历史模式和基础路径
 */
const router = createRouter({
  // 使用HTML5历史模式，需要服务器配置支持
  history: createWebHistory(),
  routes,
  // 路由滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

/**
 * 全局前置路由守卫
 * @description 在路由跳转前执行，可用于权限验证、页面标题设置等
 */
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // 这里可以添加权限验证逻辑
  if (to.meta.requiresAuth) {
    // 检查用户是否登录
    // const isAuthenticated = checkAuth()
    // if (!isAuthenticated) {
    //   next('/login')
    // } else {
    //   next()
    // }
    next()
  } else {
    next()
  }
})

/**
 * 全局后置路由守卫
 * @description 在路由跳转完成后执行，可用于埋点统计等
 */
router.afterEach((to, from) => {
  // 可以在这里添加页面访问统计
  console.log(`路由跳转: ${from.path} -> ${to.path}`)
})

// 导出路由实例
export default router