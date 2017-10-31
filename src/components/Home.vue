<template>
    <div class="section">
        <div class="container">
            <hr>
            <div class="title has-text-centered">
                <h1>@todo: need api for latest Products</h1>
            </div>
            <latest-products></latest-products>
        </div>
    </div>
</template>

<script>
    import LatestProducts from '@/components/LatestProducts'

    export default {
        name: 'home',
        components: {
            LatestProducts
        }
    }
</script>