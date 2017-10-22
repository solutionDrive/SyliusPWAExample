<template>
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/" >{{ appName }}</router-link></li>
                <li><a href="#">Component</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import appConfig from '@/config'

    export default {
        data () {
            return {
                appName: appConfig.appName
            }
        }
    }
</script>
