import axios from 'axios'

export default {
    shop: {
        api: 'http://demo.sylius.org/shop-api',
        channel: 'US_WEB'
    },

    /**
     * ======================================
     * taxon api
     * ======================================
     */

    getAllCategories () {
        return axios.get(this.shop.api + '/taxons/')
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
        return axios.get(this.shop.api + '/taxon-products/' + code + '?channel=' + this.shop.channel)
    },

    /**
     * Get one product by product code
     *
     * @param code product code
     * @returns {AxiosPromise}
     */
    getProduct (code) {
        return axios.get(this.shop.api + '/products/' + code + '?channel=' + this.shop.channel)
    },

    /**
     * ======================================
     * cart api
     * ======================================
     */

    pickUpCart (cartid) {
        const data = new FormData();
        data.append('channel', this.shop.channel);

        return axios.post(this.shop.api + '/carts/' + cartid, data )
    },
    addToCart (productCode, cartid) {
        let variantCode = productCode + '-variant-0';
        return axios.post(this.shop.api + '/carts/' + cartid + '/items', {
                productCode: productCode,
                quantity: 1,
                variantCode: variantCode
            })
    },
    getCart (cartid) {
        return axios.get(this.shop.api + '/carts/' + cartid)
    }
}