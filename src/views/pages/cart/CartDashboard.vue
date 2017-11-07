<template>
    <div class="box" v-if="!isEmpty(cart)">
        <cart-items :cart = cart></cart-items>
        <div class="content">
            <cart-coupon></cart-coupon>
        </div>
        <div>
            <button class="button is-warning is-medium" @click="updateCart()">Update cart</button>
        </div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {isEmpty} from 'lodash'
    import appConfig from '@/config'
    import {cartApi} from '@/api'
    import CartCoupon from '@/views/pages/cart/CartCoupon'
    import CartItems from '@/views/pages/cart/CartItems'

    export default {
        name: 'cart-dashboard',
        data () {
            return {
                loading: false,
                error: '',
                imageUrl: appConfig.imageUrl
            }
        },
        props: [
            'cart'
        ],
        methods: {
            async updateCart () {
                this.loading = true
                try {
                    // @todo: need PUT updateCart API instead of item
                    for (let item of this.cart.items) {
                        await cartApi.updateCartItem(this.$store.state.cart.cartid, item.id, parseInt(item.quantity))
                    }
                    const response = await cartApi.getCart(this.$store.state.cart.cartid)
                    this.$store.commit('cart/setCart', response.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            },
            isEmpty
        },
        components: {
            ClipLoader,
            CartCoupon,
            CartItems
        }
    }
</script>