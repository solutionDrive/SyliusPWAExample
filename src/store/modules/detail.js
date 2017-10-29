const state = {
    product: {}
}

const mutations = {
    setProduct (state, product) {
        state.product = product
    },
    resetProduct (state) {
        state.product = {}
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
