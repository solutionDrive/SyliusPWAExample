<template>
    <div class="card" v-if="!isEmpty(product)">
        <div class="card-image">
            <figure class="image is-4by3">
                <router-link :to="'/detail/' + product.code">
                    <img :src="imageUrl + product.images[0].path" />
                </router-link>
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <router-link :to="'/detail/' + product.code">{{ product.name }}</router-link>
                <p>{{ getPrice(product) }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'

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
                let variants = product.variants
                let key = product.code + '-variant-0'
                let variant = variants[key]
                if (typeof variant === 'object' && typeof variant.price === 'object') {
                    return this.getFormattedPrice(variant.price)
                }

                return ''
            },
            isEmpty
        },
        mixins: [
            mixin
        ]
    }
</script>