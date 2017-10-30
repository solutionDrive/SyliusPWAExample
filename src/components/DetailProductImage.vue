<template>
    <div v-if="!objectEmpty(product)">
        <img :src="imageUrl + product.images[0].path"
             :alt="product.name"
        >
        <hr>
        <div class="columns is-mobile">
            <div class="column is-one-third" v-for="thumbnail in product.images">
                <img :src="imageUrl + thumbnail.path"
                     :alt="product.name"
                >
            </div>
        </div>
    </div>
</template>

<script>
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'

    export default {
        name: 'detail-product-image',
        data () {
            return {
                imageUrl: appConfig.imageUrl
            }
        },
        props: [
            'product'
        ],
        mixins: [
            mixin
        ]
    }
</script>