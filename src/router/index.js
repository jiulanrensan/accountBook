import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/first-page'
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/pages/home'], resolve),
      children: [
        {
          path: '/first-page',
          name: 'firstPage',
          component: resolve => require(['@/pages/firstPage'], resolve)
        },
        {
          path: '/edit',
          name: 'edit',
          component: resolve => require(['@/pages/edit'], resolve)
        }
      ]
    }
  ]
})
