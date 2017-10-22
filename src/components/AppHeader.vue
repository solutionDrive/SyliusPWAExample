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


        <div class="container header-navi">
            <mini-cart></mini-cart>
            <category></category>
        </div>
    </header>
</template>

<script>
    import Category from '@/components/Category'
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
            Category,
            MiniCart
        }
    }
</script>

<style lang="scss">
    .header-navi {
        margin-top: 2em;
    }
</style>