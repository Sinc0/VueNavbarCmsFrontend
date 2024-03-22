//imports
import { createRouter, createWebHistory } from 'vue-router'
import viewStart from '../views/viewStart.vue'
import viewBackend from '../views/viewBackend.vue'
import viewFrontend from '../views/viewFrontend.vue'


//routes
const routes = [
  //start
  { path: '/', name: 'start-1', component: viewStart },
  { path: '/start', name: 'start-2', component: viewStart },

  //backend
  { path: '/backend', name: 'backend', component: viewBackend },

  //specified domain
  { path: '/:domain/', name: 'frontend-1', component: viewFrontend },
  { path: '/:domain/:section', name: 'frontend-2', component: viewFrontend },
  { path: '/:domain/:section/:category', name: 'frontend-3', component: viewFrontend },

  //error
  { path :'/:pathMatch(.*)*', name: 'error', component: viewStart }
]


//exports
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes})
export default router
