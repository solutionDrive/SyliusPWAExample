<template>
    <div>
        <breadcrumb></breadcrumb>

        <div class="section">
            <div class="container">
                <div class="section" v-if="loading"><clip-loader></clip-loader></div>
                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="!isEmpty(product)">
                    <div class="columns">
                        <div class="column is-half-tablet">
                            <detail-product-image :product=product></detail-product-image>
                        </div>
                        <div class="column is-half-tablet">
                            <h1 class="title">{{product.name}}</h1>
                            <hr>
                            <detail-rating-link :rating = product.averageRating
                                                :count = review.length>
                            </detail-rating-link>
                            <detail-variant :product = product></detail-variant>
                        </div>
                    </div>
                    <detail-product-tab :review = review></detail-product-tab>
                    <hr>
                    <div class="has-text-centered latest-product-header">
                        <strong>Latest Products</strong>
                    </div>
                    <latest-products></latest-products>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {productApi, reviewApi} from '@/api'
    import Breadcrumb from '@/views/components/Breadcrumb'
    import LatestProducts from '@/views/components/LatestProducts'
    import DetailVariant from '@/views/pages/detail/DetailVariant'
    import DetailProductTab from '@/views/pages/detail/DetailProductTab'
    import DetailProductImage from '@/views/pages/detail/DetailProductImage'
    import DetailRatingLink from '@/views/pages/detail/DetailRatingLink'

    export default {
        data () {
            return {
                error: '',
                loading: false,
                review: []
            }
        },
        computed: {
            ...mapState({
                product: state => state.detail.product
            })
        },
        created () {
            this.fetchDataFromApi()
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            resetDetail () {
                this.error = null
                this.$store.commit('detail/resetProduct')
            },
            async fetchDataFromApi () {
                this.resetDetail()
                this.loading = true
                try {
                    const product = await productApi.getProductBySlug(this.$route.params.slug)
                    this.$store.commit('detail/setProduct', product.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
                this.fetchReviewDataFromApi()
            },
            async fetchReviewDataFromApi () {
                const review = await reviewApi.getReviewBySlug(this.$route.params.slug)
                this.review = review.data.items
            },
            isEmpty
        },
        components: {
            ClipLoader,
            Breadcrumb,
            LatestProducts,
            DetailVariant,
            DetailProductTab,
            DetailProductImage,
            DetailRatingLink
        }
    }
</script>

<style lang="scss">
    .latest-product-header {
        margin-bottom: 1.5em;
    }
</style>