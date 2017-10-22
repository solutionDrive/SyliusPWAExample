<template>
    <div>
        <div class="container">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><a href="#">{{ appName }}</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Components</a></li>
                    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
                </ul>
            </nav>
        </div>

        <div class="section">
            <div class="container">
                <div v-if="error" class="notification is-danger">{{ error }}</div>
                <h1 class="title">@todo: category name</h1>
                <p>@todo: category description</p>
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

    export default {
        data() {
            return {
                cart:{},
                loading: false,
                error: '',
                imageUrl: appConfig.imageUrl,
                appName: appConfig.appName
            }
        },
        computed: mapState([
            'products'
        ]),
        created() {
            this.fetchDataFromApi()
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            fetchDataFromApi () {
                this.error = null
                this.loading = true
                this.$store.commit('reset')
                api.getProductList(this.$route.params.code)
                    .then(response => {
                        this.$store.commit('setProducts',response.data.items)
                        this.loading = false
                    })
                    .catch(error => this.error = error.toString())
            }
        },
        components: {
            ClipLoader
        }
    }
</script>