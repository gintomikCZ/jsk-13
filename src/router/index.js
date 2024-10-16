import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/employees',
      name: 'employees',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EmployeesView.vue')
    },
    {
      path: '/employeedetail/:id', // server/employeedetail/9
      name: 'employeeDetail',
      component: () => import('../views/EmployeeDetailView.vue')
    },
    {
      path: '/employeeform',
      name: 'employeeFormAdd',
      component: () => import('../views/EmployeeFormView.vue')
    },
    {
      path: '/employeeform/:id',
      name: 'employeeFormEdit',
      component: () => import('../views/EmployeeFormView.vue')
    }
  ]
})

export default router
