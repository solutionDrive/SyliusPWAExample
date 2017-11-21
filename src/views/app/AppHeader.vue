<template>
    <header>
        <nav-bar></nav-bar>
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
                <navigation v-if="hideNavigation() === false"></navigation>
                <breadcrumb v-if="showBreadCrumb()"></breadcrumb>
            </div>
        </div>
    </header>
</template>

<script>
    import Navigation from '@/views/components/Navigation'
    import MiniCart from '@/views/components/MiniCart'
    import Breadcrumb from '@/views/components/Breadcrumb'
    import NavBar from '@/views/components/NavBar'

    export default {
        name: 'app-header',
        methods: {
            showBreadCrumb () {
                const whitelist = ['list', 'detail']
                return whitelist.includes(this.$route.name)
            },
            hideNavigation () {
                const blacklist = ['address', 'shipping', 'payment']
                return blacklist.includes(this.$route.name)
            }
        },
        components: {
            NavBar,
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