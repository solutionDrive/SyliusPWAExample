<template>
    <div class="section">
        <!--@todo: mobile looks ugly-->
        <div class="container">
            <div v-if="isCartEmpty">
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
                            <router-link :to="{name: 'address'}" class="button is-link is-large is-fullwidth">
                                Checkout
                            </router-link>
                            @todo: checkout API not working
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CartSummary from '@/views/pages/cart/CartSummary'
    import CartDashboard from '@/views/pages/cart/CartDashboard'

    export default {
        computed: {
            isCartEmpty () {
                return this.cartid === '' || this.cart.items.length === 0
            },
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
                if (this.isCartEmpty) {
                    return
                }
                await this.$store.dispatch('cart/getCart').catch(error => {
                    // @todo: error handling
                    console.error(error.toString())
                })
            }
        },
        components: {
            CartSummary,
            CartDashboard
        }
    }
</script>