<template>
    <div class="section">
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>

            <div class="columns is-multiline">
                <div class="column is-one-quarter" v-if="!isEmpty(product)">
                    <product-card :product = product></product-card>
                </div>
                <div class="column is-three-quarters">
                    create form
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import {productApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'

    export default {
        name: 'review-create',
        data () {
            return {
                error: '',
                product: {}
            }
        },
        created () {
            this.fetchProduct()
        },
        methods: {
            async fetchProduct () {
                try {
                    const product = await productApi.getProductBySlug(this.$route.params.slug)
                    this.product = product.data
                } catch (error) {
                    this.error = error.toString()
                }
            },
            isEmpty
        },
        components: {
            ProductCard
        }
    }
</script>