import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/home/Home'
import List from '@/views/pages/list/List'
import Cart from '@/views/pages/cart/Cart'
import Detail from '@/views/pages/detail/Detail'
import ReviewIndex from '@/views/pages/detail/review/Review'
import ReviewCreate from '@/views/pages/detail/review/ReviewCreate'
import Login from '@/views/pages/auth/Login'
import Register from '@/views/pages/auth/Register'
import Dashboard from '@/views/pages/account/Dashboard'
import Address from '@/views/pages/checkout/Address'
import Shipping from '@/views/pages/checkout/Shipping'
import Payment from '@/views/pages/checkout/Payment'
import Complete from '@/views/pages/checkout/Complete'
import Thankyou from '@/views/pages/checkout/Thankyou'

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
        },
        {
            path: '/checkout/address',
            name: 'address',
            component: Address,
            beforeEnter: (to, from, next) => {
                next(store.state.cart.cartid ? true : {
                    path: '/',
                    query: {
                        redirect: to.home
                    }
                })
            }
        },
        {
            path: '/checkout/shipping',
            name: 'shipping',
            component: Shipping,
            beforeEnter: (to, from, next) => {
                next(store.state.cart.cartid ? true : {
                    path: '/',
                    query: {
                        redirect: to.home
                    }
                })
            }
        },
        {
            path: '/checkout/payment',
            name: 'payment',
            component: Payment,
            beforeEnter: (to, from, next) => {
                next(store.state.cart.cartid ? true : {
                    path: '/',
                    query: {
                        redirect: to.home
                    }
                })
            }
        },
        {
            path: '/checkout/complete',
            name: 'complete',
            component: Complete,
            beforeEnter: (to, from, next) => {
                next(store.state.cart.cartid ? true : {
                    path: '/',
                    query: {
                        redirect: to.home
                    }
                })
            }
        },
        {
            path: '/thankyou',
            name: 'thankyou',
            component: Thankyou
        }
    ]
})
