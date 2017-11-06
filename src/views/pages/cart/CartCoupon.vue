<template>
    <div class="field has-addons">
        <div class="control">
            <input class="input" type="text" placeholder="Enter your code..."
                   v-model="coupon">
        </div>
        <div class="control">
            <a class="button is-primary" @click="addCoupon()">Apply coupon</a>
            <div v-if="loading"><clip-loader></clip-loader></div>
        </div>
        <div v-if="error" class=" section notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {couponApi, cartApi} from '@/api'

    export default {
        data () {
            return {
                loading: false,
                error: '',
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
                    await couponApi.addCoupon(this.$store.state.cart.cartid, this.coupon)
                    const response = await cartApi.getCart(this.$store.state.cart.cartid)
                    this.$store.commit('cart/setCart', response.data)
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