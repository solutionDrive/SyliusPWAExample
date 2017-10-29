import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Cart from '@/components/Cart'
import Detail from '@/components/Detail'

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
            path: '/detail/:code',
            name: 'detail',
            component: Detail
        }
    ]
})
