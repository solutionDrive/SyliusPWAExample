<template>
    <div>
        <category></category>

        <br>

        <!--@todo: loading icon-->
        <div v-if="loading">Loading</div>
        <div class="container">
            <div v-if="error" class="notification is-danger">{{ error }}</div>

            <div v-if="product">
                <div class="columns">
                    <div class="column is-half-tablet">
                        <img :src="'http://demo.sylius.org/media/image/' + product.images[0].path"
                             :alt="product.name"
                        >
                        <hr>
                        <div class="columns is-multiline">
                            <div class="column is-one-third" v-for="thumbnail in product.images">
                                <img :src="'http://demo.sylius.org/media/image/' + thumbnail.path"
                                     :alt="product.name"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="column is-half-tablet">
                        <h1 class="title">{{product.name}}</h1>
                        <hr>
                        <div>@todo: review</div>
                        <div class="columns">
                            <div class="column is-half">
                                @todo: price first variant
                            </div>
                            <div class="column is-half">
                                <small>{{product.code}}</small>
                            </div>
                        </div>
                        <p>@todo: product description</p>
                        <div class="box">
                            @todo: product variant
                            <div>
                                <a @click="addToCart(product.code)" class="button is-link">
                                    add first variant to cart
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabs is-boxed">
                    <ul>
                        <li class="is-active">
                            <a>
                                <span>Details</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>Attributes</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span>Reviews</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <p>
                    @todo: similar product
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './../api'
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                product: {},
                error: '',
                loading: false
            }
        },
        computed: mapState([
            'cartid'
        ]),
        created () {
            this.fetchDataFromApi()
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            fetchDataFromApi () {
                this.error = this.product = null
                this.loading = true
                api.getProduct(this.$route.params.code)
                    .then(response => this.product = response.data)
                    .catch(error => this.error = error.toString())
                this.loading = false
            },
            addToCart(productCode) {
                if (this.cartid === '') {
                    this.$store.commit('initCartId')
                    api.pickUpCart(this.cartid).then(response => api.addToCart(productCode, this.cartid))
                } else {
                    api.addToCart(productCode, this.cartid)
                }
            }
        }
    }
</script>