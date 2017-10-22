import axios from 'axios'
import appConfig from '@/config'

export default {

    /**
     * ======================================
     * taxon api
     * ======================================
     */

    getAllCategories () {
        return axios.get(appConfig.apiUrl + '/taxons/')
    },

    getCategoryByCode (code) {
        return axios.get(appConfig.apiUrl + '/taxons/' + code + '?locale=' + appConfig.apiLocale)
    },

    /**
     * ======================================
     * product api
     * ======================================
     */

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
    },

    /**
     * ======================================
     * cart api
     * ======================================
     */

    pickUpCart (cartid) {
        const data = new FormData();
        data.append('channel', appConfig.apiChannel);

        return axios.post(appConfig.apiUrl + '/carts/' + cartid, data )
    },
    addToCart (productCode, cartid) {
        let variantCode = productCode + '-variant-0';
        return axios.post(appConfig.apiUrl + '/carts/' + cartid + '/items', {
            productCode: productCode,
            quantity: 1,
            variantCode: variantCode
        })
    },
    getCart (cartid) {
        return axios.get(appConfig.apiUrl + '/carts/' + cartid)
    }
}