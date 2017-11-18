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

                        <button @click="register" class="button is-link"
                                :class="{'is-loading': loading && loadingAction === 'register'}"
                        >
                            next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
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
                loading: false,
                loadingAction: ''
            }
        }
    }
</script>