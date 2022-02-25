import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TOverview from '@/components/Templates/TOverview.vue'
import Ticket from '@/components/Templates/Ticket.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/overview',
    name: 'Overview',
    component: TOverview,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
