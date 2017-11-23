import store from '@/store'

const Address = () => import('@/views/pages/checkout/Address')
const Shipping = () => import('@/views/pages/checkout/Shipping')
const Payment = () => import('@/views/pages/checkout/Payment')
const Complete = () => import('@/views/pages/checkout/Complete')
const Thankyou = () => import('@/views/pages/checkout/Thankyou')

export default {
    routes: [
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
}
