<template>
    <div>
        <app-header></app-header>
        <main>
            <router-view></router-view>
        </main>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from '@/views/app/AppHeader'
    import AppFooter from '@/views/app/AppFooter'

    export default {
        name: 'app',
        components: {
            AppHeader,
            AppFooter
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    @import '../../../node_modules/bulma/bulma';

    body {
        background: $app-background-color;
    }
</style>
