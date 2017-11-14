import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/home/Home'
import List from '@/views/pages/list/List'
import Cart from '@/views/pages/cart/Cart'
import Detail from '@/views/pages/detail/Detail'
import ReviewIndex from '@/views/pages/detail/review/Review'
import ReviewCreate from '@/views/pages/detail/review/ReviewCreate'
import Login from '@/views/pages/auth/Login'
import Dashboard from '@/views/pages/dashboard/Dashboard'

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
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        }
    ]
})
