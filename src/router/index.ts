import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import DashboardPage from '@/components/pages/dashboard-page/dashboard-page.vue'
import IssuePage from '@/components/pages/issue-page/issue-page.vue'

import { PREFIXES } from '@/constants/prefixes'

const prefix = PREFIXES.APP_PREFIX

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${prefix}dashboardpage`,
    name: 'DashboardPage',
    component: DashboardPage,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  {
    path: `/${prefix}issuepage`,
    name: 'IssuePage',
    component: IssuePage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
