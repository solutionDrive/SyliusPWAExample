<template>
    <div class="box">
        <div>
            <a @click="addToCart(product.code)" class="button is-link">
                add first variant to cart
            </a>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {cartApi} from '@/api'

    export default {
        name: 'detail-variant',
        data () {
            return {
                loading: false,
                error: ''
            }
        },
        props: [
            'product'
        ],
        computed: {
            ...mapState({
                cartid: state => state.cart.cartid
            })
        },
        methods: {
            async addToCart(productCode) {
                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    await cartApi.pickUpCart(this.cartid);
                }

                await this.updateAfterAddToCart(productCode)
            },
            async updateAfterAddToCart (productCode) {
                try {
                    this.loading = true
                    await cartApi.addToCart(productCode, this.cartid)
                    let cart = await cartApi.getCart(this.cartid)
                    this.$store.commit('cart/setCart', cart.data)
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            }
        }
    }
</script>