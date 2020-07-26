import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Signup from '../components/Signup'
import DashBoard from '../components/Dashboard'
import Profile from '../components/Profile'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BABEL_ENV,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/sign-up',
            name: 'sign-up',
            component: Signup
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard
        },

        {
            path: '/profile',
            name: 'profile',
            component: Profile
        }
    ]
})

export default router
