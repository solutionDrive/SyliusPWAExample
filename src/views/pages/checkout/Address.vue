<template>
    <div class="section">
        <div class="container">
            <section class="box">
                <h3 class="is-3"><strong>Shipping Address</strong></h3>
                <hr class="is-marginless">

                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <div v-if="validationError" class="notification is-danger">{{ validationError }}</div>

                <div class="field">
                    <label class="label">First name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="firstName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Last name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="lastName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Street Address</label>
                    <div class="control">
                        <input class="input" type="text" v-model="street">
                    </div>
                </div>

                <div class="field">
                    <label class="label">City</label>
                    <div class="control">
                        <input class="input" type="text" v-model="city">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Postcode</label>
                    <div class="control">
                        <input class="input" type="text" v-model="postcode">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Province name</label>
                    <div class="control">
                        <input class="input" type="text" v-model="provinceName">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Country Code</label>
                    <div class="control">
                        <input class="input" type="text" v-model="countryCode">
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
        </div>
    </div>
</template>

<script>
    import {some, isEmpty} from 'lodash'

    export default {
        name: 'checkout-address',
        data () {
            return {
                firstName: '',
                lastName: '',
                countryCode: '',
                street: '',
                city: '',
                postcode: '',
                provinceName: '',
                validationError: '',
                error: '',
                loading: false
            }
        },
        methods: {
            async updateAddress () {
                this.validationError = ''
                this.error = ''
                this.loading = true
                const addressData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    countryCode: this.countryCode,
                    street: this.street,
                    city: this.city,
                    postcode: this.postcode,
                    provinceName: this.provinceName
                }
                const cartid = this.$store.state.cart.cartid
                const payload = {
                    addressData,
                    cartid
                }
                // @todo: validation
                if (some(addressData, isEmpty)) {
                    this.validationError = 'there is empty field'
                    this.loading = false
                    return
                }
                await this.$store.dispatch('checkout/updateAddress', payload).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                if (this.error === '') {
                    // this.$router.push({name: 'shipping'})
                }
            }
        }
    }
</script>