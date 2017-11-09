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
            formattedPrice (currency, value) {
                return this.formattedCurrency(currency) + this.formattedValue(value)
            },
            formattedVariantPrice (price) {
                return this.formattedPrice(price.currency, price.current)
            }
        }
        Vue.prototype.$syliuspwa = {
            price
        }
    }
}
