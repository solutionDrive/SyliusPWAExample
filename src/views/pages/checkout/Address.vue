<template>
    <div class="section">
        <div class="container">
            <section class="box" v-if="shippingAddress">
                <h3 class="is-3"><strong>Shipping Address</strong></h3>
                <hr class="is-marginless">

                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <div v-if="validationError" class="notification is-danger">{{ validationError }}</div>

                <div class="field">
                    <label class="label">First name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.firstName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Last name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.lastName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Street Address</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.street">
                    </div>
                </div>

                <div class="field">
                    <label class="label">City</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.city">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Postcode</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.postcode">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Province name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.provinceName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Country Code</label>
                    <div class="control">
                        <input class="input" type="text" v-model="shippingAddress.countryCode">
                    </div>
                    <p><small>@todo: need api to get all available Country Code</small></p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <router-link :to="{name: 'home'}" class="button is-light">
                            back to store
                        </router-link>

                        <button @click="updateAddress" class="button is-link" :class="{'is-loading': loading}">
                            next
                        </button>
                    </div>
                </div>
            </section>
            <checkout-cart></checkout-cart>
        </div>
    </div>
</template>

<script>
    import {some, isEmpty} from 'lodash'
    import {mapState} from 'vuex'
    import CheckoutCart from '@/views/pages/checkout/components/Cart'

    export default {
        name: 'checkout-address',
        data () {
            return {
                validationError: '',
                error: '',
                loading: false
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.cart
            }),
            shippingAddress () {
                // @todo: need email field for customer, not supported by the api
                if (this.cart.shippingAddress && !isEmpty(this.cart.shippingAddress)) {
                    return this.cart.shippingAddress
                }

                return {
                    firstName: '',
                    lastName: '',
                    countryCode: 'US',
                    street: '',
                    city: '',
                    postcode: '',
                    provinceName: ''
                }
            }
        },
        methods: {
            async updateAddress () {
                this.validationError = ''
                this.error = ''
                this.loading = true
                const payload = {
                    addressData: this.shippingAddress,
                    cartid: this.cart.tokenValue
                }
                // @todo: validation
                if (some(payload.addressData, isEmpty)) {
                    this.validationError = 'there is empty field'
                    this.loading = false
                    return
                }
                await this.$store.dispatch('checkout/updateAddress', payload).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                if (this.error === '') {
                    this.$router.push({name: 'shipping'})
                }
            }
        },
        components: {
            CheckoutCart
        }
    }
</script>
