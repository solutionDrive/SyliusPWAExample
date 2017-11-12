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

    export default {
        name: 'cart-coupon',
        data () {
            return {
                loading: false,
                loadingAction: '',
                error: '',
                couponCode: '' // @todo: do we still need coupon Code?
            }
        },
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

                await this.handleCouponAction('apply', 'cart/addCoupon')
            },
            async removeCoupon () {
                await this.handleCouponAction('remove', 'cart/removeCoupon')
            },
            async handleCouponAction (name, type) {
                this.error = ''
                this.loading = true
                this.loadingAction = name
                await this.$store.dispatch(type).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
            }
        }
    }
</script>