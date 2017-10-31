<template>
    <div>
        <breadcrumb></breadcrumb>

        <div class="section">
            <div class="container">
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <h1 class="title" v-if="!isEmpty(category)">{{ category.self.name }}</h1>
                <p v-if="!isEmpty(category)">{{ category.self.description }}</p>
                <hr>
                <div class="columns">
                    <div class="column is-one-quarter">
                        <list-sidebar :category = category.self></list-sidebar>
                    </div>
                    <div class="column">
                        <div class="columns is-multiline">
                            <div class="column is-full">
                                <list-search></list-search>
                                <p class="is-pulled-right">@todo: need SyliusElasticSearchBundle for filter/search api</p>
                            </div>
                            <div class="column is-full" v-if="loading"><clip-loader></clip-loader></div>
                            <div class="column is-one-third" v-for="product in products">
                                <product-card :product = product></product-card>
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
    import {isEmpty} from 'lodash'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {categoryApi, productApi} from '@/api'
    import Breadcrumb from '@/components/Breadcrumb'
    import ListSidebar from '@/components/ListSidebar'
    import ListSearch from '@/components/ListSearch'
    import ProductCard from '@/components/ProductCard'

    export default {
        data () {
            return {
                loading: false,
                error: ''
            }
        },
        computed: mapState({
            products: state => state.list.products,
            category: state => state.list.category
        }),
        created () {
            this.fetchDataFromApi()
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            async fetchDataFromApi () {
                this.resetList()
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
            isEmpty
        },
        components: {
            ClipLoader,
            Breadcrumb,
            ListSidebar,
            ListSearch,
            ProductCard
        }
    }
</script>