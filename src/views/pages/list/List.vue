<template>
    <div class="section">
        <div class="column is-full" v-if="loading"><clip-loader></clip-loader></div>
        <div class="container" v-if="!loading">
            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <h1 class="title">{{ category.self.name }}</h1>
            <p>{{ category.self.description }}</p>
            <hr>
            <div class="columns">
                <div class="column is-one-quarter">
                    <list-sidebar :category="category.self"></list-sidebar>
                </div>
                <div class="column">
                    <div class="columns is-multiline">
                        <!--<div class="column is-full">-->
                            <!--<list-search></list-search>-->
                            <!--<p class="is-pulled-right">@todo: need SyliusElasticSearchBundle for filter/search api</p>-->
                        <!--</div>-->
                        <div class="column is-one-third" v-for="product in products">
                            <product-card :product = "product"></product-card>
                        </div>
                        <div class="column is-full">
                            <list-pagination :list = "list"></list-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {categoryApi, productApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'
    import ListSidebar from '@/views/pages/list/ListSidebar'
    import ListSearch from '@/views/pages/list/ListSearch'
    import ListPagination from '@/views/pages/list/ListPagination'

    export default {
        data () {
            return {
                loading: false,
                error: '',
                list: {}
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
                    await Promise.all([
                        this.fetchCategoryFromApi(),
                        this.fetchProductsFromApi()
                    ])
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            },
            resetList: function () {
                this.error = null
                this.loading = true
                this.list = {}
                this.$store.commit('list/resetCategory')
                this.$store.commit('list/resetProducts')
            },
            async fetchCategoryFromApi () {
                const category = await categoryApi.getByCode(this.$route.params.code)
                return this.$store.commit('list/setCategory', category.data)
            },
            async fetchProductsFromApi () {
                const route = this.$route
                const list = await productApi.getList(route.params.code, route.query.page)
                this.list = list.data
                return this.$store.commit('list/setProducts', this.list.items)
            }
        },
        components: {
            ProductCard,
            ListSidebar,
            ListSearch,
            ListPagination
        }
    }
</script>