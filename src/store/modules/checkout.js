import {checkoutApi} from '@/api'

const state = {
    address: {},
    shipments: {},
    shipmentSelected: '', // @todo: currently not use
    payments: {},
    paymentSelected: '', // @todo: currently not user
    checkout: {}
}

const mutations = {
    setAddress (state, address) {
        state.address = address
    },
    setShipments (state, shipments) {
        state.shipments = shipments
    },
    setShipmentSelected (state, shipmentSelected) {
        state.shipmentSelected = shipmentSelected
    },
    setPayments (state, payments) {
        state.payments = payments
    },
    setPaymentSelected (state, paymentSelected) {
        state.paymentSelected = paymentSelected
    },
    setCheckout (state, checkout) {
        state.checkout = checkout
    },
    resetCheckout (state) {
        state.address = {}
        state.shipments = {}
        state.shipmentSelected = {}
        state.payments = {}
        state.paymentSelected = {}
        state.checkout = {}
    }
}

const actions = {
    async updateAddress ({commit}, payload) {
        try {
            const response = await checkoutApi.putAddress(payload.cartid, payload.addressData)
            commit('setAddress', response.data)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async getShipments ({commit}, cartid) {
        try {
            const response = await checkoutApi.getShipments(cartid)
            commit('setShipments', response.data.shipments[0].methods)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async updateShipment ({commit}, payload) {
        try {
            await checkoutApi.putShipment(payload.cartid, payload.code)
            commit('setShipmentSelected', payload.code)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async getPayments ({commit}, cartid) {
        try {
            const response = await checkoutApi.getPayments(cartid)
            commit('setPayments', response.data.payments[0].methods)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async updatePayment ({commit}, payload) {
        try {
            await checkoutApi.putPayment(payload.cartid, payload.code)
            commit('setPaymentSelected', payload.code)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async getCheckout ({commit}, cartid) {
        try {
            const response = await checkoutApi.getCheckout(cartid)
            commit('setCheckout', response.data)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async completeCheckout ({commit}, order) {
        try {
            await checkoutApi.completeCheckout(order.cartid, order.payload)
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
