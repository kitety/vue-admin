import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import InfoShow from './views/InfoShow.vue'
import Fundlist from './views/Fundlist.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // 重定向
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoShow',
          component: InfoShow
        },
        {
          path: '/fundlist',
          name: 'fundlist',
          component: Fundlist
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
