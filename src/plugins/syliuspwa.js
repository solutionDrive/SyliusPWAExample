export default {
    install: function (Vue, options) {
        let price = {
            /**
             * @todo: currency support, would be better to fetch once from api and save in the store
             *
             * @param currency
             * @returns {string}
             */
            formattedCurrency (currency) {
                return currency === 'USD' ? '$' : currency
            },
            formattedValue (value) {
                return (value / 100).toFixed(2)
            },
            formattedVariantPrice (price) {
                const currency = this.formattedCurrency(price.currency)
                const value = this.formattedValue(price.current)
                return currency + value
            }
        }
        Vue.prototype.$syliuspwa = {
            price
        }
    }
}
