<template>
    <div class="section">
        <div class="container">
            <div v-if="loading"><clip-loader></clip-loader></div>

            <div v-if="emptyCart">
                <div class="notification is-info">
                    <p><strong>Info</strong></p>
                    <p>Your cart is empty</p>
                </div>
            </div>
            <div v-else>
                <h1 class="title">Your shopping cart</h1>
                <h4 class="subtitle">Edit your items, apply coupon or proceed to the checkout</h4>

                <div class="columns">
                    <div class="column is-two-thirds">
                        <cart-dashboard :cart = cart></cart-dashboard>
                    </div>
                    <div class="column is-one-third">
                        <cart-summary :cart = cart></cart-summary>
                        <div>
                            @todo: checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {cartApi} from '@/api'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import CartSummary from '@/components/CartSummary'
    import CartDashboard from '@/components/CartDashboard'

    export default {
        data () {
            return {
                loading: false,
                emptyCart: false
            }
        },
        computed: {
            ...mapState({
                cartid: state => state.cart.cartid,
                cart: state => state.cart.cart
            })
        },
        created () {
            this.getCart()
        },
        methods: {
            async getCart () {
                if (this.cartid === '') {
                    this.emptyCart = true
                    return
                }
                this.loading = true
                let cart = await cartApi.getCart(this.cartid)
                this.$store.commit('cart/setCart', cart.data)
                this.loading = false
                this.emptyCart = false
            }
        },
        components: {
            ClipLoader,
            CartSummary,
            CartDashboard
        }
    }
</script>