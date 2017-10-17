import axios from 'axios'

export default {
    shop: {
        api: 'http://demo.sylius.org/shop-api'
    },
    getAllCategories () {
        return axios.get(this.shop.api + '/taxons/')
    },
    getProducts (code) {
        return axios.get(this.shop.api + '/taxon-products/' + code + '?channel=US_WEB')
    },
    pickUpCart (cartid) {
        const data = new FormData();
        data.append('channel', 'US_WEB');

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