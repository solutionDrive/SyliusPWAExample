<template>
    <div>
        <header>
            <div class="container">
                <router-link to="/" class="home">Sylius PWA</router-link>
                <router-link to="cart" class="cart">Cart</router-link>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    @import './../node_modules/bulma/css/bulma.css';

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
        background-color: #35495E;
        color: #ffffff;
    }

    header a {
        text-decoration: none;
        color: #ffffff;
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
</style>
