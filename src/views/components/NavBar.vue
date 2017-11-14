<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>{{ appName }}</strong>
            </router-link>

            <button class="button navbar-burger" data-target="navMenu"
                    :class="{'is-active': menuDisplay}"
                    @click="toggleMenu()"

            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div class="navbar-menu" id="navMenu" :class="{'is-active': menuDisplay}">
            <div class="navbar-end">
                <a class="navbar-item" href="https://bulma.io/">
                    Home
                </a>
                <a class="navbar-item" href="https://bulma.io/">
                    About
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
    import appConfig from '@/config'

    export default {
        name: 'nav-bar',
        data () {
            return {
                appName: appConfig.appName,
                menuDisplay: false
            }
        },
        methods: {
            toggleMenu () {
                this.menuDisplay = !this.menuDisplay
            }
        }
    }
</script>