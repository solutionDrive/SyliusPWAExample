<template>
    <header>
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link to="/" class="navbar-item">
                    <strong>{{ appName }}</strong>
                </router-link>
            </div>
        </nav>

        <div class="section header-navi">
            <div class="container">
                <div class="columns is-mobile">
                    <div class="column">
                        <router-link :to="{name: 'home'}" >
                            <img src="../../assets/shop_logo.png" alt="sylius" class="shop-logo">
                        </router-link>
                    </div>
                    <div class="column">
                        <mini-cart></mini-cart>
                    </div>
                </div>
                <navigation></navigation>
                <breadcrumb v-if="showBreadCrumb()"></breadcrumb>
            </div>
        </div>
    </header>
</template>

<script>
    import Navigation from '@/views/components/Navigation'
    import MiniCart from '@/views/components/MiniCart'
    import Breadcrumb from '@/views/components/Breadcrumb'
    import appConfig from '@/config'

    export default {
        name: 'app-header',
        data () {
            return {
                appName: appConfig.appName
            }
        },
        methods: {
            showBreadCrumb () {
                const whitelist = ['list', 'detail']
                return whitelist.includes(this.$route.name)
            }
        },
        components: {
            Navigation,
            MiniCart,
            Breadcrumb
        }
    }
</script>

<style lang="scss">
    .header-navi {
        padding-bottom: 0;
    }
    .shop-logo {
        width: 10em;
        height: auto;
    }
</style>