import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue'
import CalendarView from '../pages/CalendarView.vue'
import LoginPages from '../pages/loginPages.vue'
import ForgotPassword from '../pages/email-ForgotPassword.vue'
import SignUp from '../pages/signup.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPages
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 Navigation Guard */
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router