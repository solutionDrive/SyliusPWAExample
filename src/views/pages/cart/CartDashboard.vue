<template>
    <div class="box" v-if="!isEmpty(cart)">
        <div class="table">
            <thead>
                <tr>
                    <th>item</th>
                    <th><abbr title="unit price">unit price</abbr></th>
                    <th><abbr title="quantity">Qty</abbr></th>
                    <th>&nbsp;</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.items">
                    <td>
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-64x64">
                                    <img :src="imageUrl + item.product.images[0].path"
                                         :alt="item.product.name"
                                    >
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <router-link :to="{name: 'detail', params: {slug: item.product.slug}}">
                                        {{ item.product.name }}
                                    </router-link>
                                    <p><small>{{item.product.code}}</small></p>
                                    <p><small>{{item.product.variants[0].axis[0]}}</small></p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        {{item.product.variants[0].price.current / 100 + cart.currency}}
                    </td>
                    <td>
                        <input class="input" type="number" v-model="item.quantity">
                    </td>
                    <td><a class="delete" @click="removeItem(item.id)"></a></td>
                    <td>{{item.total / 100 + cart.currency}}</td>
                </tr>
            </tbody>
        </div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div v-if="error" class="notification is-danger">{{ error }}</div>
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
            async removeItem (itemId) {
                this.loading = true
                try {
                    const response = await cartApi.removeCartItem(this.$store.state.cart.cartid, itemId)
                    this.$store.commit('cart/setCart', response.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            },
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
            CartCoupon
        }
    }
</script>