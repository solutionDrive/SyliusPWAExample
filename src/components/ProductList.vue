<template>
    <div>
        <category></category>

        <div class="container">
            @todo: breadcrumb component
        </div>

        <br>

        <!--@todo: loading icon-->
        <div v-if="loading">Loading</div>
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>
            <h1 class="title">@todo: category name</h1>
            <p>@todo: category description</p>
            <hr>
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
                                            <img :src="'http://demo.sylius.org/media/image/' + product.images[0].path" />
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
</template>

<script>
    import api from './../api'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                cart:{},
                loading: false,
                error: ''
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
                api.getProductList(this.$route.params.code)
                    .then(response => this.$store.commit('setProducts',response.data.items))
                    .catch(error => this.error = error.toString())
                this.loading = false
            }
        }
    }
</script>