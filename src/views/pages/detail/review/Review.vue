<template>
    <div class="section">
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <div class="section" v-if="loading"><clip-loader></clip-loader></div>

            <div class="columns is-multiline">
                <div class="column is-one-quarter" v-if="!isEmpty(product)">
                    <product-card :product = product></product-card>
                </div>
                <div class="column is-three-quarters">
                    <div v-if="!isEmpty(review)" v-for="item in review.items" class="box">
                        <review-media-box :item = item></review-media-box>
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
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {productApi, reviewApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'
    import ReviewMediaBox from '@/views/pages/detail/review/ReviewMediaBox'

    export default {
        name: 'review',
        data () {
            return {
                loading: false,
                error: '',
                product: {},
                review: {}
            }
        },
        async created () {
            this.loading = true
            await this.fetchProduct()
            await this.fetchProductReview()
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
            ReviewMediaBox,
            ClipLoader
        }
    }
</script>