import axios from 'axios'
import appConfig from '@/config'

export default {
    login (data) {
        const payload = {
            _username: data.email,
            _password: data.password
        }

        return axios.post(appConfig.apiUrl + '/login_check', payload)
    },
    register (data) {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            plainPassword: data.password,
            channel: appConfig.apiChannel
        }

        return axios.post(appConfig.apiUrl + '/register', payload)
    },
    getMe (token) {
        return axios.get(appConfig.apiUrl + '/me', {
            headers: { Authorization: 'Bearer ' + token }
        })
    }
}
