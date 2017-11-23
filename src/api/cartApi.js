import axios from 'axios'
import appConfig from '@/config'

export default {
    pickUp (cartid) {
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
    addItem (cartid, productCode, quantity, variantCode) {
        return axios.post(appConfig.apiUrl + '/carts/' + cartid + '/items', {
            productCode,
            quantity,
            variantCode
        })
    },
    get (cartid) {
        return axios.get(appConfig.apiUrl + '/carts/' + cartid)
    },
    updateItem (cartid, itemid, quantity) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid, {quantity})
    },
    removeItem (cartid, itemid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/items/' + itemid)
    },
    clear (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid)
    }
}
