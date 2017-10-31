import axios from 'axios'
import appConfig from '@/config'

export const categoryApi = {
    getAllCategories () {
        return axios.get(appConfig.apiUrl + '/taxons/')
    },

    getCategoryByCode (code) {
        return axios.get(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale)
    }
}

export const productApi = {
    /**
     * Get product list by taxon Code
     *
     * @param code
     * @param page
     * @returns {AxiosPromise}
     */
    getProductList (code, page = 1) {
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
    getProduct (code) {
        return axios.get(appConfig.apiUrl + '/products/' + code + '?channel=' + appConfig.apiChannel)
    },
    /**
     * Get one product by the given slug
     *
     * @param slug
     * @returns {AxiosPromise}
     */
    getProductBySlug (slug) {
        return axios.get(appConfig.apiUrl + '/products-by-slug/' + slug + '?channel=' + appConfig.apiChannel)
    },
    /**
     * @todo: need an api for this method
     *
     * @returns {*|AxiosPromise}
     */
    getLatestProducts () {
        const code = 'mugs'
        return this.getProductList(code)
    }
}

export const cartApi = {
    pickUpCart (cartid) {
        const data = new FormData()
        data.append('channel', appConfig.apiChannel)

        return axios.post(appConfig.apiUrl + '/carts/' + cartid, data)
    },
    /**
     * @todo: for single product without variantCode ?
     *
     * @param cartid
     * @param productCode
     * @param quantity
     * @param variantCode
     * @returns {AxiosPromise}
     */
    addToCart (cartid, productCode, quantity, variantCode) {
        return axios.post(appConfig.apiUrl + '/carts/' + cartid + '/items', {
            productCode,
            quantity,
            variantCode
        })
    },
    getCart (cartid) {
        return axios.get(appConfig.apiUrl + '/carts/' + cartid)
    }
}

/**
 * query object to query string
 *
 * @param paramsObject
 * @returns {string}
 */
function toQueryString (paramsObject) {
    return Object.keys(paramsObject).map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(paramsObject[key])
    }).join('&')
}
