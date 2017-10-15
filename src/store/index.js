//@todo: leave first in the repo, should be fixed and used to store and generate cartid
import Vue from 'vue'
import Vuex from 'vuex'
import uuidRandom from 'uuid-random'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartid: ''
    },
    mutations: {
        initCartId (state) {
            state.cartid = uuidRandom();
        },
        setCartId (state, id) {
            state.cartid = id
        }
    }
})