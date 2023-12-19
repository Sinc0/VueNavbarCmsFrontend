//imports
import { createRouter, createWebHistory } from 'vue-router'
import viewMain from '../views/viewMain.vue'


//routes
const routes = [
  //default
  { path: '/', name: 'Main', component: viewMain },
  
  //section id
  { path: '/:sectionId', name: 'specifiedWithSectionId', component: viewMain },
  
  //section id and section category
  { path: '/:sectionId/:sectionCategory', name: 'specifiedWithSectionIdAndSectionCategory', component: viewMain }
]

//set router
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes})

//exports
export default router
