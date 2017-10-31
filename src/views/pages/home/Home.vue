<template>
    <div class="section">
        <div class="container">
            <div class="title has-text-centered">
                <h1>Latest Products</h1>
            </div>
            <latest-products></latest-products>
            <div>
                <p class="is-pulled-right">@todo: this is just fake product list, need api for latest Products</p>
            </div>
        </div>
    </div>
</template>

<script>
    import LatestProducts from '@/views/components/LatestProducts'

    export default {
        name: 'home',
        components: {
            LatestProducts
        }
    }
</script>