import {productApi} from 'sylius-axios-api'

const state = {
    latestProducts: {}
}

const mutations = {
    setLatestProducts (state, products) {
        state.latestProducts = products
    }
}

const actions = {
    async getLatestProducts ({commit, state}) {
        try {
            const response = await productApi.getLatest()
            commit('setLatestProducts', response.data.items)
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
