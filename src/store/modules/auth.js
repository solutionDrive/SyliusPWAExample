import {authApi} from '@/api'

const state = {
    // @todo get user after get the token
    // @todo: token expire?
    // @todo: refresh token?
    token: '',
    me: {}
}

const mutations = {
    setToken (state, token) {
        state.token = token
    },
    setMe (state, me) {
        state.me = me
    }
}

const actions = {
    async login ({commit, dispatch}, formData) {
        try {
            const tokenResponse = await authApi.login(formData)
            commit('setToken', tokenResponse.data.token)
            await dispatch('addme')
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async register ({commit, dispatch}, formData) {
        try {
            const response = await authApi.register(formData)
            if (response.status === 204) {
                const loginData = {
                    email: formData.email,
                    password: formData.password
                }
                await dispatch('login', loginData)
            }
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    async addme ({commit, state}) {
        try {
            const response = await authApi.getMe(state.token)
            commit('setMe', response.data)
        } catch (error) {
            throw new Error(error.response.data.message)
        }
    },
    // @todo: need a better way of doing this
    logout ({commit}, router) {
        commit('setToken', '')
        commit('setMe', {})

        router.go(router.currentRoute)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
