export default {
    install: function (Vue, options) {
        Vue.prototype.$syliuspwa = {
            getFormattedPrice: function (priceObject) {
                let currency = ''
                if (priceObject.currency === 'USD') {
                    currency = '$'
                }
                return currency + priceObject.current / 100
            }
        }
    }
}
