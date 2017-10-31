<template>
    <div class="section">
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>

            <div class="columns is-multiline">
                <div class="column is-one-quarter" v-if="!isEmpty(product)">
                    <product-card :product = product></product-card>
                </div>
                <div class="column is-three-quarters">
                    <div v-if="!isEmpty(review)" v-for="item in review.items" class="box">
                        <detail-review-media-box :item = item></detail-review-media-box>
                    </div>
                    <div>
                        <a class="button is-link">add your Review</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import {productApi, reviewApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'
    import DetailReviewMediaBox from '@/views/pages/detail/review/DetailReviewMediaBox'

    export default {
        name: 'detail-review',
        data () {
            return {
                error: '',
                product: {},
                review: {}
            }
        },
        created () {
            this.fetchProduct()
            this.fetchProductReview()
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
            async fetchProductReview () {
                try {
                    const review = await reviewApi.getReviewBySlug(this.$route.params.slug)
                    this.review = review.data
                } catch (error) {
                    this.error = error.toString()
                }
            },
            isEmpty
        },
        components: {
            ProductCard,
            DetailReviewMediaBox
        }
    }
</script>