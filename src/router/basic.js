const Home = () => import('@/views/pages/home/Home')
const List = () => import('@/views/pages/list/List')
const Cart = () => import('@/views/pages/cart/Cart')
const Detail = () => import('@/views/pages/detail/Detail')

export default {
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
}
