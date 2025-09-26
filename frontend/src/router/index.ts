import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const Login = () => import('../pages/auth/Login.vue')
const Register = () => import('../pages/auth/Register.vue')
const ForgotPassword = () => import('../pages/auth/ForgotPassword.vue')
const Dashboard = () => import('../pages/Dashboard.vue')
const Essay = () => import('../pages/Essay.vue')
const Plans = () => import('../pages/Plans.vue')
const History = () => import('../pages/History.vue')
const Admin = () => import('../pages/admin/Admin.vue')

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: Login, meta: { public: true } },
    { path: '/register', name: 'register', component: Register, meta: { public: true } },
    { path: '/forgot', name: 'forgot', component: ForgotPassword, meta: { public: true } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/essay', name: 'essay', component: Essay },
    { path: '/plans', name: 'plans', component: Plans },
    { path: '/history', name: 'history', component: History },
    { path: '/admin', name: 'admin', component: Admin, meta: { requiresAdmin: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.public) return true
    if (!auth.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } }
    }
    if (to.meta.requiresAdmin && !auth.currentUser?.isAdmin) {
        return { name: 'dashboard' }
    }
    return true
})

export default router


