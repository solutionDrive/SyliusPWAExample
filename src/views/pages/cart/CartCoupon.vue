<template>
    <div class="field has-addons">
        <div class="control">
            <input class="input" type="text" placeholder="Enter your code..."
                   v-model="coupon">
        </div>
        <div class="control">
            <a class="button is-primary" @click="addCoupon()">Apply coupon</a>
            <a class="button is-danger" @click="removeCoupon()">Remove coupon</a>
        </div>
        <div v-if="loading"><clip-loader></clip-loader></div>
        <div v-if="error" class=" section notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {couponApi} from '@/api'

    export default {
        data () {
            return {
                loading: false,
                error: '',
                success: '',
                coupon: ''
            }
        },
        name: 'cart-coupon',
        methods: {
            async addCoupon () {
                this.loading = true
                if (!this.coupon) {
                    return
                }

                try {
                    const response = await couponApi.addCoupon(this.$store.state.cart.cartid, this.coupon)
                    this.$store.commit('cart/setCart', response.data)
                    this.success = 'add coupon ' + this.coupon + ' successfully'
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            },
            async removeCoupon () {
                this.loading = true

                try {
                    const response = await couponApi.removeCoupon(this.$store.state.cart.cartid)
                    this.$store.commit('cart/setCart', response.data)
                    this.success = 'coupon ' + this.coupon + ' removed'
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