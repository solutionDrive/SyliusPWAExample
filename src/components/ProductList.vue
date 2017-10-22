<template>
    <div>
        <breadcrumb :taxon-code="$route.params.code"></breadcrumb>

        <div class="section">
            <div class="container">
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <h1 class="title" v-if="!categoryEmpty()">{{ category.self.name }}</h1>
                <p v-if="!categoryEmpty()">{{ category.self.description }}</p>
                <hr>
                <div class="section" v-if="loading"><clip-loader></clip-loader></div>
                <div class="columns">
                    <div class="column is-one-quarter">
                        @todo: category tree
                    </div>
                    <div class="column">
                        <div class="columns is-multiline is-mobile">
                            <div class="column is-full">
                                @todo: search box
                            </div>
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
                                            <p>@todo first variant price</p>
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
    import api from '@/api'
    import appConfig from '@/config'
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import Breadcrumb from '@/components/Breadcrumb'

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
                let category = await api.getCategoryByCode(this.$route.params.code)
                return this.$store.commit('list/setCategory', category.data)
            },
            async fetchProductsFromApi () {
                let products = await api.getProductList(this.$route.params.code)
                return this.$store.commit('list/setProducts', products.data.items)
            },
            categoryEmpty () {
                return Object.keys(this.category).length === 0
            }
        },
        components: {
            ClipLoader,
            Breadcrumb
        }
    }
</script>