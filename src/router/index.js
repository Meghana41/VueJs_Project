import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ErrorPage from '../components/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/headlineDetails',
    name: 'HeadlineDetails',
    component: () => import('../views/HeadlineDetails.vue')
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
