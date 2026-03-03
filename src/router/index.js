// import { createRouter, createWebHistory } from "vue-router";
// import EmailForgotPassword from "../pages/email-ForgotPassword.vue";
// import NewPassword from "../pages/newpassword.vue";

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       path: "/forgot-password",
//       component: EmailForgotPassword,
//     },
//     {
//       path: "/new-password",
//       component: NewPassword,
//     },
//   ],
// });

// export default router;








// ล่าสุด

// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../pages/HomeView.vue'
// import CalendarView from '../pages/CalendarView.vue' // ✅ Import หน้าปฏิทินเข้ามา

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/calendar', // ✅ ตั้งชื่อ Path ที่จะใช้เชื่อมไป
//     name: 'calendar',
//     component: CalendarView
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router










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
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* 🔐 Navigation Guard */
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  // หน้าที่ต้อง login ก่อนเข้า
  const protectedPages = ['/home', '/calendar']

  if (protectedPages.includes(to.path) && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router