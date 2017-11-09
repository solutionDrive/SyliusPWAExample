<template>
    <div class="card" v-if="!isEmpty(product)">
        <div class="card-image">
            <figure class="image is-4by3">
                <router-link :to="{name: 'detail', params: {slug: product.slug}}">
                    <img :src="imageUrl + product.images[0].path" />
                </router-link>
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <router-link :to="{name: 'detail', params: {slug: product.slug}}">
                    {{ product.name }}
                </router-link>
                <p>{{ getPrice(product) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import appConfig from '@/config'

    export default {
        name: 'product-card',
        data () {
            return {
                imageUrl: appConfig.imageUrl
            }
        },
        props: [
            'product'
        ],
        methods: {
            /**
             * @todo: there must be a better way to fetch the collect price on list
             *
             * @param product
             * @returns {string}
             */
            getPrice (product) {
                const variants = product.variants
                const key = product.code + '-variant-0'
                const variant = variants[key]
                if (typeof variant === 'object' && typeof variant.price === 'object') {
                    return this.$syliuspwa.getFormattedPrice(variant.price)
                }

                return ''
            },
            isEmpty
        }
    }
</script>