<template>
    <header>
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <strong>{{ appName }}</strong>
                </router-link>

                <button class="button navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>

        <div class="section header-navi">
            <div class="container">
                <mini-cart></mini-cart>
                <navigation></navigation>
            </div>
        </div>
    </header>
</template>

<script>
    import Navigation from '@/components/Navigation'
    import MiniCart from '@/components/MiniCart'
    import appConfig from '@/config'

    export default {
        name: 'app-header',
        data () {
            return {
                appName: appConfig.appName
            }
        },
        components: {
            Navigation,
            MiniCart
        }
    }
</script>

<style lang="scss">
    .header-navi {
        padding-bottom: 0;
    }
</style>