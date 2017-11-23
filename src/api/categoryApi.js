import axios from 'axios'
import appConfig from '@/config'

export default {
    getAll () {
        return axios.get(appConfig.apiUrl + '/taxons/')
    },

    getByCode (code) {
        return axios.get(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale)
    }
}
