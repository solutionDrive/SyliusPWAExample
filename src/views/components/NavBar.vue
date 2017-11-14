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
                <router-link :to="{name: 'login'}" class="navbar-item">
                    login
                </router-link>
                <router-link :to="{name: 'register'}" class="navbar-item">
                    register
                </router-link>
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
        watch: {
            '$route': 'hideMenu'
        },
        methods: {
            hideMenu () {
                this.menuDisplay = false
            },
            toggleMenu () {
                this.menuDisplay = !this.menuDisplay
            }
        }
    }
</script>