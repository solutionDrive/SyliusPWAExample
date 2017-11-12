import uuidRandom from 'uuid-random'
import {cartApi, couponApi} from '@/api'

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
    },
    resetCart (state) {
        state.cartid = ''
        state.coupon = ''
        state.cart = {}
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
    },
    async clearCart ({commit, state}) {
        try {
            await cartApi.clearCart(state.cartid)
            commit('resetCart')
        } catch (error) {
            throw error
        }
    },
    async addCoupon ({commit, state}, couponCode) {
        try {
            const response = await couponApi.addCoupon(state.cartid, couponCode)
            commit('setCart', response.data)
            commit('setCoupon', couponCode)
        } catch (error) {
            throw new Error(error.response.data.errors.coupon[0])
        }
    },
    async removeCoupon ({commit, state}) {
        try {
            const response = await couponApi.removeCoupon(state.cartid)
            commit('setCart', response.data)
            commit('setCoupon', '')
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
