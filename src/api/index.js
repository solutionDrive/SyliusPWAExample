import axios from 'axios'

export default {
    getAllCategories () {
        return axios.get('http://demo.sylius.org/shop-api/taxons/')
    },
    getProducts (slug) {
        return axios.get('http://demo.sylius.org/shop-api/taxon-products/' + slug + '?channel=US_WEB')
    }
}