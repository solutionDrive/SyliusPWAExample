import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        category: {}
    },
    mutations: {
        setProducts (state, products) {
            state.products = products
        },
        resetProducts (state) {
            state.products = []
        },
        setCategory (state, category) {
            state.category = category
        },
        resetCategory (state) {
            state.category = {}
        }
    },
    modules: {
        cart
    }
})