import axios from 'axios'
import appConfig from '@/config'

export default {
    updateAddress (cartid, formData) {
        const payload = {
            shippingAddress: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                countryCode: formData.countryCode,
                street: formData.street,
                city: formData.city,
                postcode: formData.postcode,
                provinceName: formData.provinceName
            }
        }
        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/address', payload)
    },
    getShipments (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid + '/shipping')
    },
    updateShipment (cartid, shipmentCode) {
        const payload = {
            method: shipmentCode
        }

        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/shipping/0', payload)
    },
    getPayments (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid + '/payment')
    },
    updatePayment (cartid, paymentCode) {
        const payload = {
            method: paymentCode
        }

        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/payment/0', payload)
    },
    get (cartid) {
        return axios.get(appConfig.apiUrl + '/checkout/' + cartid)
    },
    complete (cartid, payload) {
        return axios.put(appConfig.apiUrl + '/checkout/' + cartid + '/complete', payload)
    }
}
