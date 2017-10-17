import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import Home from '@/components/Home'
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
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/detail/:code',
            name: 'detail',
            component: Detail
        },
    ]
})
