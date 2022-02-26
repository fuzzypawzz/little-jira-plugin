import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import DashboardPage from '@/components/pages/dashboard-page/dashboard-page.vue'
import IssuePage from '@/components/pages/issue-page/issue-page.vue'

import { PREFIXES } from '@/constants/prefixes'

export enum ROUTE_NAMES {
  DASHBOARD_PAGE = 'dashboardpage',
  ISSUE_PAGE = 'issuepage',
}

const prefix = PREFIXES.APP_PREFIX

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${prefix}${ROUTE_NAMES.DASHBOARD_PAGE}`,
    name: 'DashboardPage',
    component: DashboardPage,
  },
  // TODO: Remove this when i have investigated whether lazy loading is intersting for this app
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
    path: `/${prefix}${ROUTE_NAMES.ISSUE_PAGE}/:issueId`,
    name: 'IssuePage',
    component: IssuePage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
