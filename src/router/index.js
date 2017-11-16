import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/home/Home'
import List from '@/views/pages/list/List'
import Cart from '@/views/pages/cart/Cart'
import Detail from '@/views/pages/detail/Detail'
import ReviewIndex from '@/views/pages/detail/review/Review'
import ReviewCreate from '@/views/pages/detail/review/ReviewCreate'
import Login from '@/views/pages/auth/Login'
import Logout from '@/views/pages/auth/Logout'
import Register from '@/views/pages/auth/Register'
import Dashboard from '@/views/pages/account/Dashboard'

import store from '@/store'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list/:code',
            name: 'list',
            component: List
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/detail/:slug',
            name: 'detail',
            component: Detail
        },
        {
            path: '/detail/:slug/review',
            name: 'review-index',
            component: ReviewIndex
        },
        {
            path: '/detail/:slug/review/new',
            name: 'review-create',
            component: ReviewCreate
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/account/dashboard',
            name: 'dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
                next(store.state.auth.token ? true : {
                    path: '/login',
                    query: {
                        redirect: to.login
                    }
                })
            }
        }
    ]
})
