<template>
    <div class="section">
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <div class="section" v-if="loading"><clip-loader></clip-loader></div>

            <div class="columns is-multiline" v-if="!isEmpty(product)">
                <div class="column is-one-quarter">
                    <product-card :product = "product"></product-card>
                </div>
                <div class="column is-three-quarters">
                    <div class="box">
                        <review-create-form :productName = "product.name"></review-create-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import {productApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'
    import ReviewCreateForm from '@/views/pages/detail/review/ReviewCreateForm'

    export default {
        name: 'review-create',
        data () {
            return {
                loading: false,
                error: '',
                product: {}
            }
        },
        async created () {
            this.loading = true
            await this.fetchProduct()
            this.loading = false
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
            ProductCard,
            ReviewCreateForm
        }
    }
</script>