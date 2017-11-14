<template>
    <div class="section">
        <header class="content">
            <h1 class="title">Customer login</h1>
            <p class="subtitle">Access your store account or create a new one</p>
        </header>

        <section class="box">
            <form action="">
                <p><strong>Registered customers</strong></p>
                <hr class="is-marginless">
                <p class="content">If you have an account, sign in with your e-mail address.</p>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="text" value="bulma">
                    </div>
                    <!--@todo: validation-->
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <p class="control">
                        <input class="input" type="password">
                    </p>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link">Login</button>
                    </div>
                    <div class="control">
                        <button class="button is-light">@todo: reset password</button>
                    </div>
                </div>
            </form>
        </section>
    </div>

</template>

<script>
    export default {
        name: 'login'
    }
</script>