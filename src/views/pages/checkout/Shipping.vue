<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <h3 class="is-3"><strong>Shipment</strong></h3>
                <hr>
                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="shipments && shipments !== {}" v-for="shipping in shipments" class="box">
                    <p>{{shipping.name}}</p>
                    <p>{{shipping.description}}</p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <router-link :to="{name: 'address'}" class="button is-light">
                            Change address
                        </router-link>

                        <button class="button is-link" :class="{'is-loading': loading}">
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
        name: 'checkout-shipping',
        data () {
            return {
                error: '',
                loading: false
            }
        },
        computed: {
            ...mapState({
                shipments: state => state.checkout.shipments
            })
        },
        created () {
            this.getShipments()
        },
        methods: {
            async getShipments () {
                this.error = ''
                this.loading = true
                await this.$store.dispatch('checkout/getShipments', this.$store.state.cart.cartid).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            }
        }
    }
</script>
