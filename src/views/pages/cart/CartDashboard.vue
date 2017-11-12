<template>
    <div class="box" v-if="!isEmpty(cart)">
        <cart-items :cart = cart></cart-items>
        <div class="content">
            <cart-coupon></cart-coupon>
        </div>
        <div>
            <button @click="updateCart()" class="button is-warning is-medium"
                    :class="{'is-loading': loading && loadingAction === 'update'}">
                Update cart
            </button>
            <button @click="clearCart()" class="button is-danger is-medium is-pulled-right"
                    :class="{'is-loading': loading && loadingAction === 'delete'}">
                Clear cart
            </button>
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
                loadingAction: '',
                error: ''
            }
        },
        props: [
            'cart'
        ],
        methods: {
            async updateCart () {
                this.loading = true
                this.loadingAction = 'update'
                await this.$store.dispatch('cart/updateCart').catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
            },
            async clearCart () {
                // @todo overlay, are you sure?
                this.loading = true
                this.loadingAction = 'delete'
                await this.$store.dispatch('cart/clearCart').catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
            },
            isEmpty
        },
        components: {
            CartCoupon,
            CartItems
        }
    }
</script>