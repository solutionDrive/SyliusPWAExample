import uuidRandom from 'uuid-random'

const state = {
    cartid: '',
    cart: {}
}

const mutations = {
    // @todo: save cartid (localStorage) in order to fetch further with the same id
    initCartId (state) {
        state.cartid = uuidRandom()
    },
    setCartId (state, id) {
        state.cartid = id
    },
    setCart (state, cart) {
        state.cart = cart
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
