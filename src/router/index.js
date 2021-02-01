import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddingResume from '../views/AddingResume.vue'
import ChangingResume from '../views/ChangingResume.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddingResume',
    component: AddingResume
  },
  {
    path: '/edit/:id',
    name: 'ChangingResume',
    component: ChangingResume,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
