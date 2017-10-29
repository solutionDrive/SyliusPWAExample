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
     * @param code taxon code
     * @returns {AxiosPromise}
     */
    getProductList (code) {
        return axios.get(appConfig.apiUrl + '/taxon-products/' + code + '?channel=' + appConfig.apiChannel)
    },

    /**
     * Get one product by product code
     *
     * @param code product code
     * @returns {AxiosPromise}
     */
    getProduct (code) {
        return axios.get(appConfig.apiUrl + '/products/' + code + '?channel=' + appConfig.apiChannel)
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
