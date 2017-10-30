export default {
    methods: {
        /**
         * @todo must be a better way, and this function not belongs here
         *
         * @param priceObject
         * @returns {*}
         */
        getFormattedPrice (priceObject) {
            let currency = ''
            if (priceObject.currency === 'USD') {
                currency = '$'
            }
            return currency + priceObject.current / 100
        }
    }
}
