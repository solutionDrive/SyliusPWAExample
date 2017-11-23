import Vue from 'vue'
import Router from 'vue-router'
import basic from './basic'
import checkout from './checkout'
import review from './review'
import account from './account'

Vue.use(Router)

export default new Router({
    routes: [
        ...basic.routes,
        ...checkout.routes,
        ...review.routes,
        ...account.routes
    ]
})
