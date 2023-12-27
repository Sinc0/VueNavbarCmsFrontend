//imports
import { createRouter, createWebHistory } from 'vue-router'
import viewMain from '../views/viewMain.vue'
import viewStart from '../views/viewStart.vue'
import viewBackend from '../views/viewBackend.vue'


//routes
const routes = [
  { path: '/', name: 'start', component: viewStart },
  { path: '/backend', name: 'backend', component: viewBackend },
  { path: '/:sectionId', name: 'specifiedWithSectionId', component: viewMain },
  { path: '/:sectionId/:sectionCategory', name: 'specifiedWithSectionIdAndSectionCategory', component: viewMain }
]


//set router
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes})


//exports
export default router
