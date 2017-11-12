<template>
    <div>
        <div class="field has-addons">
            <div class="control">
                <input class="input" type="text" placeholder="Enter your code..."
                       v-model="couponCode">
            </div>
            <div class="control">
                <a class="button is-primary" @click="addCoupon()"
                   :class="{'is-loading': loading && loadingAction === 'apply'}">
                    Apply coupon
                </a>
            </div>
            <div class="control">
                <a class="button is-danger" @click="removeCoupon()" v-if="coupon"
                   :class="{'is-loading': loading && loadingAction === 'remove'}">
                    Remove</a>
            </div>
        </div>
        <div v-if="coupon">
            applied coupon: <span class="tag is-success">{{coupon}}</span>
        </div>
        <div v-if="error" class="notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {couponApi} from '@/api'

    export default {
        data () {
            return {
                loading: false,
                loadingAction: '',
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

                this.error = ''
                this.loading = true
                this.loadingAction = 'apply'
                await this.$store.dispatch('cart/addCoupon', this.couponCode).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
            },
            async removeCoupon () {
                this.loading = true
                this.loadingAction = 'remove'

                try {
                    const response = await couponApi.removeCoupon(this.$store.state.cart.cartid)
                    this.$store.commit('cart/setCart', response.data)
                    this.$store.commit('cart/setCoupon', '')
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
                this.loadingAction = ''
            }
        }
    }
</script>