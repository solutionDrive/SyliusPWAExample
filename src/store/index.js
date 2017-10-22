import Vue from 'vue'
import Vuex from 'vuex'
import uuidRandom from 'uuid-random'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartid: '',
        products: []
    },
    mutations: {
        initCartId (state) {
            state.cartid = uuidRandom();
        },
        setCartId (state, id) {
            state.cartid = id
        },
        setProducts (state, products) {
            state.products = products
        }
    },
    modules: {
        cart
    }
})