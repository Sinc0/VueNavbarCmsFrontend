import { createRouter, createWebHistory } from 'vue-router'

//views
import Home from '../views/Home.vue'

const routes = [
  //default
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  //about
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
  //section id
  {
    path: '/:sectionId',
    name: 'specifiedWithSectionId',
    component: Home,
  },
  
  //section id and section category
  {
    path: '/:sectionId/:sectionCategory',
    name: 'specifiedWithSectionIdAndSectionCategory',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
