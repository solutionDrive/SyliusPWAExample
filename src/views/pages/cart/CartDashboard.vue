<template>
    <div class="box" v-if="!isEmpty(cart)">
        <cart-items :cart = cart></cart-items>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div class="content">
            <cart-coupon></cart-coupon>
        </div>
        <div>
            <button class="button is-warning is-medium" @click="updateCart()">Update cart</button>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import CartCoupon from '@/views/pages/cart/CartCoupon'
    import CartItems from '@/views/pages/cart/CartItems'

    export default {
        name: 'cart-dashboard',
        data () {
            return {
                loading: false,
                error: ''
            }
        },
        props: [
            'cart'
        ],
        methods: {
            async updateCart () {
                this.loading = true
                await this.$store.dispatch('cart/updateCart').catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            },
            isEmpty
        },
        components: {
            CartCoupon,
            CartItems
        }
    }
</script>