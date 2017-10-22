<template>
    <div>
        <header>
            <div class="container">
                <router-link to="/" class="home">Sylius PWA</router-link>
                <router-link to="/cart" class="cart">Cart</router-link>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                        @todo: footer
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    @import "./assets/scss/variables";
    @import './../node_modules/bulma/bulma.sass';

    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    header {
        margin: 0;
        height: 56px;
        padding: 0 16px 0 24px;
        background-color: $app-background-color;
        color: #ffffff;
    }

    header a {
        text-decoration: none;
        color: $header-font-color;
        display: inline-block;
        position: relative;
        font-size: 20px;
        line-height: 1;
        letter-spacing: .02em;
        font-weight: 400;
        box-sizing: border-box;
        padding-top: 16px;
    }

    header a:hover {
        text-decoration: none;
        color: #ffffff;
    }

    header a.cart {
        float: right;
    }

    footer.footer {
        color: $footer-font-color;
    }
</style>
