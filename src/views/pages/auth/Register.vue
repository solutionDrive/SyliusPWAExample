<template>
    <div class="section">
        <div class="container">
            <header class="content">
                <h1 class="title">Register in the store</h1>
                <p class="subtitle">Create a new customer account</p>
            </header>

            <section class="box">
                <p><strong>Personal information</strong></p>
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
                            Create an account
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data () {
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmation: '',
                validationError: '',
                error: '',
                loading: false,
                loadingAction: ''
            }
        },
        methods: {
            async register () {
                this.validationError = ''
                if (this.firstName === '' || this.lastName === '' || this.email === '' || this.password === '') {
                    this.validationError = 'please fill in the form'
                    return
                }

                this.error = ''
                this.loading = true
                this.loadingAction = 'register'
                const loginData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password
                }
                await this.$store.dispatch('auth/register', loginData).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
                if (this.error === '') {
                    this.$router.push({name: 'dashboard'})
                }
            }
        }
    }
</script>