<template>
    <div class="section">
        <header class="content">
            <h1 class="title">Customer login</h1>
            <p class="subtitle">Access your store account or create a new one</p>
        </header>

        <section class="box">
            <p><strong>Registered customers</strong></p>
            <hr class="is-marginless">
            <p class="content">If you have an account, sign in with your e-mail address.</p>

            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <div v-if="validationError" class="notification is-danger">{{ validationError }}</div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input class="input" type="text" value="bulma" v-model="email">
                </div>
                <!--@todo: validation-->
            </div>

            <div class="field">
                <label class="label">Password</label>
                <p class="control">
                    <input class="input" type="password" v-model="password">
                </p>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button @click="login" class="button is-link"
                            :class="{'is-loading': loading && loadingAction === 'login'}"
                    >
                        Login
                    </button>
                </div>
                <div class="control">
                    <button class="button is-light">@todo: reset password</button>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                error: '',
                loading: '',
                loadingAction: '',
                validationError: '',
                email: '',
                password: ''
            }
        },
        methods: {
            async login () {
                this.validationError = ''
                if (this.email === '' || this.password === '') {
                    this.validationError = 'please fill in email and password'
                    return
                }

                this.error = ''
                this.loading = true
                this.loadingAction = 'login'
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                await this.$store.dispatch('auth/login', loginData).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
                this.loadingAction = ''
            }
        }
    }
</script>