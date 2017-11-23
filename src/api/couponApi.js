import axios from 'axios'
import appConfig from '@/config'

export default {
    add (cartid, coupon) {
        return axios.put(appConfig.apiUrl + '/carts/' + cartid + '/coupon', {coupon})
    },
    remove (cartid) {
        return axios.delete(appConfig.apiUrl + '/carts/' + cartid + '/coupon')
    }
}
