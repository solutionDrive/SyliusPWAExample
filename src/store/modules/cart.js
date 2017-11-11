import uuidRandom from 'uuid-random'
import {cartApi} from '@/api'

const state = {
    cartid: '',
    coupon: '',
    cart: {}
}

const mutations = {
    initCartId (state) {
        state.cartid = uuidRandom()
    },
    setCartId (state, id) {
        state.cartid = id
    },
    setCart (state, cart) {
        state.cart = cart
    },
    setCoupon (state, coupon) {
        state.coupon = coupon
    }
}

const actions = {
    async removeItem ({commit, state}, itemId) {
        try {
            const response = await cartApi.removeCartItem(state.cartid, itemId)
            commit('setCart', response.data)
        } catch (error) {
            throw error
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
