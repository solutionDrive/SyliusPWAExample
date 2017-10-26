const state = {
    products: [],
    category: {}
}

const mutations = {
    setProducts (state, products) {
        state.products = products
    },
    resetProducts (state) {
        state.products = []
    },
    setCategory (state, category) {
        state.category = category
    },
    resetCategory (state) {
        state.category = {}
    }
}

export default {
    namespaced: true,
    state,
    mutations
}