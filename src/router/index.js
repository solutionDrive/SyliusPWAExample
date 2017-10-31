import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/pages/home/Home'
import List from '@/views/pages/list/List'
import Cart from '@/views/pages/cart/Cart'
import Detail from '@/views/pages/detail/Detail'

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
        }
    ]
})
