<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <h3 class="is-3"><strong>Payment</strong></h3>
                <hr>
                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="payments && payments !== {}" v-for="payment in payments" class="box">
                    <label class="radio">
                        <input type="radio" name="payment" v-model="paymentSelected" :value="payment.code">
                        <strong>{{payment.name}}</strong>
                    </label>
                    <p>{{payment.description}}</p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <router-link :to="{name: 'shipping'}" class="button is-light">
                            Change Shipment
                        </router-link>

                        <button @click="updatePayment" class="button is-link" :class="{'is-loading': loading}">
                            next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'checkout-payment',
        data () {
            return {
                error: '',
                loading: false,
                paymentSelected: ''
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.cart,
                payments: state => state.checkout.payments
            })
        },
        created () {
            this.getPayments()
            this.paymentSelected = this.cart.payments[0].method.code
        },
        methods: {
            async getPayments () {
                this.error = ''
                await this.$store.dispatch('checkout/getPayments', this.$store.state.cart.cartid).catch(error => {
                    this.error = error.toString()
                })
            },
            async updatePayment () {
                this.loading = true
                this.error = ''
                const cartid = this.cart.tokenValue
                const code = this.paymentSelected
                await this.$store.dispatch('checkout/updatePayment', {cartid, code}).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            }
        }
    }
</script>
