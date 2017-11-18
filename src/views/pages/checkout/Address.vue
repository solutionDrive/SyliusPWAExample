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
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email" v-model="email">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password" v-model="password">
                    </p>
                </div>

                <div class="field">
                    <label class="label">confirmation</label>
                    <p class="control">
                        <input class="input" type="password" v-model="confirmation">
                    </p>
                </div>

                <div class="field">
                    <div class="control">
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
        name: 'checkout-address'
    }
</script>