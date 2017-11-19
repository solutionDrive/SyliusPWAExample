<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <header class="content">
                    <h3 class="title is-3">Summary of your order</h3>
                </header>
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <div class="box">
                    <div><strong>Shipping Address</strong></div>
                    <hr class="is-marginless">
                    <div><strong>{{ shippingAddress.firstName + ' ' + shippingAddress.lastName }}</strong></div>
                    <div>{{ shippingAddress.street }}</div>
                    <div>{{ shippingAddress.city + ', ' + shippingAddress.postcode }}</div>
                    <div>{{ shippingAddress.provinceName }}</div>
                    <div>{{ shippingAddress.countryCode }}</div>
                </div>
                
                <cart-items :cart = cart :editable = false></cart-items>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" :class="{'is-loading': loading}">
                            Place order
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CartItems from '@/views/pages/cart/CartItems'

    export default {
        name: 'checkout-complete',
        data () {
            return {
                loading: false,
                error: ''
            }
        },
        created () {
            this.getCheckout()
        },
        computed: {
            ...mapState({
                checkout: state => state.checkout.checkout,
                cart: state => state.cart.cart
            }),
            shippingAddress () {
                return this.checkout.shippingAddress
            }
        },
        methods: {
            async getCheckout () {
                this.error = ''
                await this.$store.dispatch('checkout/getCheckout', this.$store.state.cart.cartid).catch(error => {
                    this.error = error.toString()
                })
            }
        },
        components: {
            CartItems
        }
    }
</script>

