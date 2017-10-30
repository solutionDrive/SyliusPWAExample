export default {
    methods: {
        objectEmpty (obj) {
            return Object.getOwnPropertyNames(obj).length === 0
        },
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
