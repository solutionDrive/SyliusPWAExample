<template>
    <div>

        <div class="section">
            <div class="container">
                <mini-cart></mini-cart>
                <category></category>
                <br>
                <div class="section" v-if="loading"><clip-loader></clip-loader></div>
                <div v-if="error" class="notification is-danger">{{ error }}</div>

                <div v-if="product">
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
    </div>
</template>

<script>
    import api from '@/api'
    import {mapState} from 'vuex'
    import appConfig from '@/config'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import MiniCart from '@/components/MiniCart'

    export default {
        data () {
            return {
                product: {},
                error: '',
                loading: false,
                imageUrl: '',
            }
        },
        computed: {
            cartid () {
                return this.$store.state.cart.cartid;
            }
        },
        created () {
            this.fetchDataFromApi()
            this.imageUrl = appConfig.imageUrl;
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        methods: {
            fetchDataFromApi () {
                this.error = this.product = null
                this.loading = true
                api.getProduct(this.$route.params.code)
                    .then(response => {
                        this.product = response.data
                        this.loading = false
                    })
                    .catch(error => this.error = error.toString())
            },
            addToCart(productCode) {
                this.loading = true
                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    api.pickUpCart(this.cartid).then(response => {
                        api.addToCart(productCode, this.cartid).then(() => {
                            api.getCart(this.cartid).then(response => {
                                this.$store.commit('cart/setCart', response.data)
                                this.loading = false
                            })
                        })
                    })
                } else {
                    api.addToCart(productCode, this.cartid).then(() => {
                        api.getCart(this.cartid).then(response => {
                            this.$store.commit('cart/setCart', response.data)
                            this.loading = false
                        })
                    })
                }
            }
        },
        components: {
            ClipLoader,
            MiniCart
        }
    }
</script>