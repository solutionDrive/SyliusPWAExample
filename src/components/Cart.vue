<template>
    <div class="section">
        <div class="container">
            <div v-if="loading"><clip-loader></clip-loader></div>

            <div v-if="emptyCart">
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
                        <div class="box">
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
                                                        <router-link :to="'/detail/' + item.product.code">{{ item.product.name }}</router-link>
                                                        <p><small>{{item.product.code}}</small></p>
                                                        <p><small>{{item.product.variants[0].axis[0]}}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {{item.product.variants[0].price.current / 100 + cart.currency}}
                                        </td>
                                        <td>{{item.quantity}}</td>
                                        <td><a class="delete"></a></td>
                                        <td>{{item.total / 100 + cart.currency}}</td>
                                    </tr>
                                </tbody>
                            </div>
                            <div>
                                @todo: apply coupon
                            </div>
                            <div>
                                @todo: update cart button
                            </div>
                        </div>
                    </div>
                    <div class="column is-one-third">
                        <cart-summary :cart = cart></cart-summary>
                        <div>
                            @todo: checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {cartApi} from '@/api'
    import appConfig from '@/config'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import CartSummary from '@/components/CartSummary'

    export default {
        data () {
            return {
                loading: false,
                emptyCart: false,
                imageUrl: appConfig.imageUrl
            }
        },
        computed: {
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
                if (this.cartid === '') {
                    this.emptyCart = true
                    return
                }
                this.loading = true
                let cart = await cartApi.getCart(this.cartid)
                this.$store.commit('cart/setCart', cart.data)
                this.loading = false
                this.emptyCart = false
            }
        },
        components: {
            ClipLoader,
            CartSummary
        }
    }
</script>