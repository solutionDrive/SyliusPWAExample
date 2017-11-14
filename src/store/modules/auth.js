import {authApi} from '@/api'

const state = {
    token: ''
}

const mutations = {
    setToken (state, token) {
        state.token = token
    }
}

const actions = {
    async login ({commit}, formData) {
        try {
            const response = await authApi.login(formData)
            console.log(response.data.token)
            commit('setToken', response.data.token)
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
