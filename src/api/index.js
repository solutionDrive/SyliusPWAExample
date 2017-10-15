import axios from 'axios'

export default {
    shop: {},
    getAllCategories () {
        return axios.get('http://demo.sylius.org/shop-api/taxons/')
    },
    getProducts (code) {
        return axios.get('http://demo.sylius.org/shop-api/taxon-products/' + code + '?channel=US_WEB')
    },
    pickUpCart (cartid) {
        const data = new FormData();
        data.append('channel', 'US_WEB');

        return axios.post('http://demo.sylius.org/shop-api/carts/' + cartid, data )
    },
    addToCart (productCode, cartid) {
        let variantCode = productCode + '-variant-0';
        this.pickUpCart(cartid).then(response => {
            // let simpleData = {
            //     'productCode': productCode,
            //     'quantity': 1,
            //     'variantCode': variantCode
            // }
            //
            // axios.post('http://demo.sylius.org/shop-api/carts/' + cartid + '/items', simpleData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })

            let data = new FormData();
            data.append('productCode', productCode);
            data.append('quantity', 1);
            data.append('variantCode', variantCode);

            axios.post('http://demo.sylius.org/shop-api/carts/' + cartid + '/items', data)
        });

    }
}