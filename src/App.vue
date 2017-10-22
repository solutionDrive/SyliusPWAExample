<template>
    <div>
        <app-header></app-header>
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
    import AppHeader from '@/components/AppHeader'

    export default {
        name: 'app',
        components: {
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/variables";
    @import './../node_modules/bulma/bulma.sass';

    body {
        background: $app-background-color;
    }

    footer.footer {
        color: $footer-font-color;
    }
</style>
