<template>
    <div>
        <breadcrumb></breadcrumb>

        <div class="section">
            <div class="container">
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <h1 class="title" v-if="!objectEmpty(category)">{{ category.self.name }}</h1>
                <p v-if="!objectEmpty(category)">{{ category.self.description }}</p>
                <hr>
                <div class="columns">
                    <div class="column is-one-quarter">
                        <list-sidebar></list-sidebar>
                    </div>
                    <div class="column">
                        <div class="columns is-multiline is-mobile">
                            <div class="column is-full">
                                <list-search></list-search>
                            </div>
                            <div class="section" v-if="loading"><clip-loader></clip-loader></div>
                            <div class="column is-one-third" v-for="product in products">
                                <div class="card">
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
                            </div>
                            <div class="column is-full">
                                @todo: pagination component
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {categoryApi, productApi} from '@/api'
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'
    import Breadcrumb from '@/components/Breadcrumb'
    import ListSidebar from '@/components/ListSidebar'
    import ListSearch from '@/components/ListSearch'

    export default {
        data() {
            return {
                loading: false,
                error: '',
                imageUrl: appConfig.imageUrl
            }
        },
        computed: mapState({
            products: state => state.list.products,
            category: state => state.list.category
        }),
        created() {
            this.fetchDataFromApi()
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            async fetchDataFromApi () {
                this.resetList();
                try {
                    await this.fetchCategoryFromApi()
                    await this.fetchProductsFromApi()
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            },
            resetList: function () {
                this.error = null
                this.loading = true
                this.$store.commit('list/resetCategory')
                this.$store.commit('list/resetProducts')
            },
            async fetchCategoryFromApi () {
                let category = await categoryApi.getCategoryByCode(this.$route.params.code)
                return this.$store.commit('list/setCategory', category.data)
            },
            async fetchProductsFromApi () {
                let products = await productApi.getProductList(this.$route.params.code)
                return this.$store.commit('list/setProducts', products.data.items)
            },
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
            }
        },
        components: {
            ClipLoader,
            Breadcrumb,
            ListSidebar,
            ListSearch
        },
        mixins: [
            mixin
        ]
    }
</script>