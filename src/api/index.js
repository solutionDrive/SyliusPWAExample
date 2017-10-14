import axios from 'axios'

export default {
    getAllCategories () {
        return axios.get('http://demo.sylius.org/shop-api/taxons/')
    },
    getProducts (code) {
        return axios.get('http://demo.sylius.org/shop-api/taxon-products/' + code + '?channel=US_WEB')
    }
}