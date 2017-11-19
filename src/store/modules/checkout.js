import {checkoutApi} from '@/api'

const state = {
    address: {},
    shipments: {},
    shipment: {},
    payments: {},
    payment: {}
}

const mutations = {
    setAddress (state, address) {
        state.address = address
    },
    setShipments (state, shipments) {
        state.shipments = shipments
    },
    setShipment (state, shipment) {
        state.shipment = shipment
    },
    setPayments (state, payments) {
        state.payments = payments
    },
    setPayment (state, payment) {
        state.payment = payment
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
            const response = await checkoutApi.putShipment(payload.cartid, payload.code)
            commit('setShipment', response.data)
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
            const response = await checkoutApi.putPayment(payload.cartid, payload.code)
            commit('setPayment', response.data)
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
