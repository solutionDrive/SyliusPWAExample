import {productApi, categoryApi} from 'sylius-axios-api'

const state = {
    latestProducts: {},
    taxons: []
}

const mutations = {
    setLatestProducts (state, products) {
        state.latestProducts = products
    },
    setTaxons (state, taxons) {
        state.taxons = taxons
    }
}

const actions = {
    async getLatestProducts ({commit}) {
        try {
            const response = await productApi.getLatest()
            commit('setLatestProducts', response.data.items)
        } catch (error) {
            throw error
        }
    },
    async getTaxons ({commit}) {
        try {
            const response = await categoryApi.getAll()
            commit('setTaxons', response.data[0].children)
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
