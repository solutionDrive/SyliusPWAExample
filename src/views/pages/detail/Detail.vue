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
                            <div>@todo: review</div>
                            <detail-variant :product = product></detail-variant>
                        </div>
                    </div>
                    <detail-product-tab></detail-product-tab>
                    <p>
                        @todo: similar product
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {productApi} from '@/api'
    import Breadcrumb from '@/views/components/Breadcrumb'
    import DetailVariant from '@/views/pages/detail/DetailVariant'
    import DetailProductTab from '@/views/pages/detail/DetailProductTab'
    import DetailProductImage from '@/views/pages/detail/DetailProductImage'

    export default {
        data () {
            return {
                error: '',
                loading: false
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
                    const product = await productApi.getProduct(this.$route.params.code)
                    this.$store.commit('detail/setProduct', product.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            },
            isEmpty
        },
        components: {
            ClipLoader,
            Breadcrumb,
            DetailVariant,
            DetailProductTab,
            DetailProductImage
        }
    }
</script>