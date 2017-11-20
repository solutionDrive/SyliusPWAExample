<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <h1 class="subtitle">Shipment</h1>

                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="shipments && shipments !== {}" v-for="shipment in shipments" class="box">
                    <label class="radio">
                        <input type="radio" name="shippng" v-model="shipmentSelected" :value="shipment.code">
                        <strong>{{shipment.name}}</strong>
                    </label>
                    <p>{{shipment.description}}</p>
                    <p class="tag is-light is-medium">{{formarttedTotal(shipment.price)}}</p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <router-link :to="{name: 'address'}" class="button is-light">
                            Change address
                        </router-link>

                        <button @click="updateShipment" class="button is-link" :class="{'is-loading': loading}">
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
    import {mapState} from 'vuex'
    import CheckoutCart from '@/views/pages/checkout/components/Cart'

    export default {
        name: 'checkout-shipping',
        data () {
            return {
                error: '',
                loading: false,
                shipmentSelected: ''
            }
        },
        computed: {
            ...mapState({
                cart: state => state.cart.cart,
                shipments: state => state.checkout.shipments
            })
        },
        created () {
            this.getShipments()
            this.shipmentSelected = this.cart.shipments[0].method.code
        },
        methods: {
            async getShipments () {
                this.error = ''
                await this.$store.dispatch('checkout/getShipments', this.$store.state.cart.cartid).catch(error => {
                    this.error = error.toString()
                })
            },
            async updateShipment () {
                this.loading = true
                this.error = ''
                const cartid = this.cart.tokenValue
                const code = this.shipmentSelected
                await this.$store.dispatch('checkout/updateShipment', {cartid, code}).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                if (this.error === '') {
                    this.$router.push({name: 'payment'})
                }
            },
            formarttedTotal (price) {
                return this.$syliuspwa.price.formattedPrice(price.currency, price.current)
            }
        },
        components: {
            CheckoutCart
        }
    }
</script>
