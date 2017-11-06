<template>
    <div>
        <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" placeholder="Enter your code..."
                       v-model="couponCode">
            </div>
            <div class="control">
                <a class="button is-primary" @click="addCoupon()">Apply coupon</a>
                <a class="button is-danger" @click="removeCoupon()" v-if="coupon">Remove coupon</a>
                <span class="tag is-success" v-if="coupon">{{coupon}}</span>
            </div>
            <div v-if="loading"><clip-loader></clip-loader></div>
        </div>
        <div v-if="error" class="notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {mapState} from 'vuex'
    import {couponApi} from '@/api'

    export default {
        data () {
            return {
                loading: false,
                error: '',
                couponCode: '' // @todo: do we still need coupon Code?
            }
        },
        name: 'cart-coupon',
        computed: {
            ...mapState({
                coupon: state => state.cart.coupon
            })
        },
        methods: {
            async addCoupon () {
                if (!this.couponCode) {
                    return
                }

                this.loading = true
                try {
                    const response = await couponApi.addCoupon(this.$store.state.cart.cartid, this.couponCode)
                    this.$store.commit('cart/setCart', response.data)
                    this.$store.commit('cart/setCoupon', this.couponCode)
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
                    this.$store.commit('cart/setCoupon', '')
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