//notes
/* route level code-splitting
this generates a separate chunk (about.[hash].js) for this route
which is lazy-loaded when the route is visited.
component: () => import(webpackChunkName: "about" '../views/About.vue') */

//imports
import { createRouter, createWebHistory } from 'vue-router'

//views
import viewMain from '../views/viewMain.vue'

const routes = [
  //default
  {
    path: '/',
    name: 'Main',
    component: viewMain,
  },
  
  //section id
  {
    path: '/:sectionId',
    name: 'specifiedWithSectionId',
    component: viewMain,
  },
  
  //section id and section category
  {
    path: '/:sectionId/:sectionCategory',
    name: 'specifiedWithSectionIdAndSectionCategory',
    component: viewMain,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
