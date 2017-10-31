<template>
    <div>
        <div class="control">
            <button @click="addToCart()" class="button is-link">add to cart</button>
        </div>

        <div v-if="error" class="notification is-danger">{{ error }}</div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {cartApi} from '@/api'

    export default {
        name: 'detail-add-to-cart',
        data () {
            return {
                loading: false,
                // @todo: handling error based on add-to-basket api request
                error: ''
            }
        },
        props: [
            'product',
            'variantCode',
            'quantity'
        ],
        computed: {
            ...mapState({
                cartid: state => state.cart.cartid
            })
        },
        methods: {
            async addToCart () {
                if (!this.variantCode) {
                    this.error = 'choose a variant'
                    return
                }

                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    await cartApi.pickUpCart(this.cartid)
                }

                await this.updateAfterAddToCart()
            },
            async updateAfterAddToCart () {
                try {
                    this.loading = true
                    await cartApi.addToCart(this.cartid, this.product.code, parseInt(this.quantity), this.variantCode)
                    const cart = await cartApi.getCart(this.cartid)
                    this.$store.commit('cart/setCart', cart.data)
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            }
        },
        components: {
            ClipLoader
        }
    }
</script>