<template>
    <div>
        <breadcrumb></breadcrumb>

        <div class="section">
            <div class="container">
                <div class="section" v-if="loading"><clip-loader></clip-loader></div>
                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="!objectEmpty(product)">
                    <div class="columns">
                        <div class="column is-half-tablet">
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
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'
    import {productApi} from '@/api'
    import Breadcrumb from '@/components/Breadcrumb'
    import DetailVariant from '@/components/DetailVariant'
    import DetailProductTab from '@/components/DetailProductTab'

    export default {
        data () {
            return {
                error: '',
                loading: false,
                imageUrl: ''
            }
        },
        computed: {
            ...mapState({
                product: state => state.detail.product
            })
        },
        created () {
            this.fetchDataFromApi()
            this.imageUrl = appConfig.imageUrl
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
                    let product = await productApi.getProduct(this.$route.params.code)
                    this.$store.commit('detail/setProduct', product.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            }
        },
        components: {
            ClipLoader,
            Breadcrumb,
            DetailVariant,
            DetailProductTab
        },
        mixins: [
            mixin
        ]
    }
</script>