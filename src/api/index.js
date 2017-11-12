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
    getProductBySlug (slug) {
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
    getLatestProducts () {
        const query = {
            'channel': appConfig.apiChannel
        }

        return axios.get(appConfig.apiUrl + '/product-latest/' + '?' + toQueryString(query))
    }
}

export const reviewApi = {
    /**
     * @param slug
     * @returns {AxiosPromise}
     */
    getReviewBySlug (slug) {
        return axios.get(appConfig.apiUrl + '/product-reviews-by-slug/' + slug + '?channel=' + appConfig.apiChannel)
    },

    /**
     * @param slug
     * @param title
     * @param rating
     * @param comment
     * @param email
     * @returns {AxiosPromise}
     */
    addReviewForSlug (slug, title, rating, comment, email) {
        const data = {
            channelCode: appConfig.apiChannel,
            title,
            rating: parseInt(rating),
            comment,
            email
        }

        return axios.post(appConfig.apiUrl + '/product-reviews-by-slug/' + slug, data)
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
    },
    updateCartItem (cartid, itemid, quantity) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid, {quantity})
    },
    removeCartItem (cartid, itemid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid)
    },
    clearCart (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid)
    }
}

export const couponApi = {
    addCoupon (cartid, coupon) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/coupon', {coupon})
    },
    removeCoupon (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/coupon')
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
