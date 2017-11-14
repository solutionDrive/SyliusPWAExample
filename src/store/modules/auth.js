import {authApi} from '@/api'

const state = {
    // @todo get user after get the token
    // @todo: token expire?
    // @todo: refresh token?
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
