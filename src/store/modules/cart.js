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
    async initCart ({commit, state}) {
        if (state.cartid === '') {
            try {
                commit('initCartId')
                await cartApi.pickUpCart(state.cartid)
            } catch (error) {
                throw error
            }
        }
    },
    async addToCart ({commit, state}, payload) {
        try {
            const response = await cartApi.addToCart(
                state.cartid,
                payload.productCode,
                parseInt(payload.quantity),
                payload.variantCode
            )
            commit('setCart', response.data)
        } catch (error) {
            throw error
        }
    },
    async getCart ({commit, state}) {
        try {
            const response = await cartApi.getCart(state.cartid)
            commit('setCart', response.data)
        } catch (error) {
            throw error
        }
    },
    async removeItem ({commit, state}, itemId) {
        try {
            const response = await cartApi.removeCartItem(state.cartid, itemId)
            commit('setCart', response.data)
        } catch (error) {
            throw error
        }
    },
    async updateCart ({commit, state}) {
        try {
            // @todo: need PUT updateCart API instead of item
            for (let item of state.cart.items) {
                await cartApi.updateCartItem(state.cartid, item.id, parseInt(item.quantity))
            }
            const response = await cartApi.getCart(state.cartid)
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
