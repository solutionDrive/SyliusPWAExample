<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <h1 class="subtitle">Summary of your order</h1>
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <div class="box">
                    <div><strong>Shipping Address</strong></div>
                    <hr class="is-marginless">
                    <div><strong>{{ shippingAddress.firstName + ' ' + shippingAddress.lastName }}</strong></div>
                    <div>{{ shippingAddress.street }}</div>
                    <div>{{ shippingAddress.city + ', ' + shippingAddress.postcode }}</div>
                    <div>{{ shippingAddress.provinceName }}</div>
                    <div>{{ shippingAddress.countryCode }}</div>
                </div>
                
                <cart-items :cart = cart :editable = false></cart-items>

                <cart-summary :cart = cart></cart-summary>

                <div class="box">
                    <h3 class="subtitle">{{checkout.payments[0].method.name}}</h3>
                </div>

                <div class="box">
                    <h3 class="subtitle">{{checkout.shipments[0].method.name}}</h3>
                </div>

                <div class="box" v-if="auth.token === ''">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email">
                        </div>
                        <p><small>@todo: customer checkout is currently not supported, just for testing</small></p>
                    </div>
                    <textarea v-model="note" class="textarea" placeholder="Extra notes"></textarea>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button @click="completeCheckout" class="button is-link is-medium" :class="{'is-loading': loading}">
                            Place order
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CartItems from '@/views/pages/cart/CartItems'
    import CartSummary from '@/views/pages/cart/CartSummary'

    export default {
        name: 'checkout-complete',
        data () {
            return {
                loading: false,
                error: '',
                email: '',
                note: ''
            }
        },
        created () {
            this.getCheckout()
        },
        computed: {
            ...mapState({
                checkout: state => state.checkout.checkout,
                cart: state => state.cart.cart,
                auth: state => state.auth
            }),
            shippingAddress () {
                return this.checkout.shippingAddress
            }
        },
        methods: {
            async getCheckout () {
                this.error = ''
                await this.$store.dispatch('checkout/getCheckout', this.$store.state.cart.cartid).catch(error => {
                    this.error = error.toString()
                })
            },
            async completeCheckout () {
                this.error = ''
                this.loading = true
                const order = {
                    cartid: this.$store.state.cart.cartid,
                    payload: {
                        email: this.email,
                        note: this.note
                    }
                }
                await this.$store.dispatch('checkout/completeCheckout', order).catch(error => {
                    this.error = error.toString()
                })

                this.$store.commit('cart/resetCart')
                this.$store.commit('cart/resetCheckout')
                this.loading = false
                if (this.error === '') {
                    this.$router.push({name: 'thankyou'})
                }
            }
        },
        components: {
            CartItems,
            CartSummary
        }
    }
</script>

