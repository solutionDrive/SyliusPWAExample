import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import list from './modules/list'
import detail from './modules/detail'
import auth from './modules/auth'
import checkout from './modules/checkout'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cart,
        list,
        detail,
        auth,
        checkout
    },
    plugins: [createPersistedState({
        key: 'sylius-pwa-vuex'
    })]
})
