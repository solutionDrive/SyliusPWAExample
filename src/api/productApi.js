import axios from 'axios'
import appConfig from '@/config'
import {toQueryString} from './utils'

export default {
    /**
     * Get product list by taxon Code
     *
     * @param code
     * @param page
     * @returns {AxiosPromise}
     */
    getList (code, page = 1) {
        const query = {
            'channel': appConfig.apiChannel,
            'limit': appConfig.apiLimit,
            page
        }

        return axios.get(appConfig.apiUrl + '/taxon-products/' + code + '?' + toQueryString(query))
    },

    /**
     * Get one product by product code
     *
     * @param code product code
     * @returns {AxiosPromise}
     */
    getByCode (code) {
        const query = {
            'channel': appConfig.apiChannel,
            'locale': appConfig.apiLocale
        }
        return axios.get(appConfig.apiUrl + '/products/' + code + '?' + toQueryString(query))
    },
    /**
     * Get one product by the given slug
     *
     * @param slug
     * @returns {AxiosPromise}
     */
    getBySlug (slug) {
        const query = {
            'channel': appConfig.apiChannel,
            'locale': appConfig.apiLocale
        }
        return axios.get(appConfig.apiUrl + '/products-by-slug/' + slug + '?' + toQueryString(query))
    },
    /**
     * @todo: api not stable
     *
     * @returns {*|AxiosPromise}
     */
    getLatest () {
        const query = {
            'channel': appConfig.apiChannel
        }

        return axios.get(appConfig.apiUrl + '/product-latest/' + '?' + toQueryString(query))
    }
}
