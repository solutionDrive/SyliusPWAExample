<template>
    <div>
        <breadcrumb :product-breadcrumb="breadcrumb"></breadcrumb>

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
    import {productApi, cartApi} from '@/api'
    import {mapState} from 'vuex'
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import Breadcrumb from '@/components/Breadcrumb'

    export default {
        data () {
            return {
                breadcrumb: [],
                error: '',
                loading: false,
                imageUrl: ''
            }
        },
        computed: {
            ...mapState({
                product: state => state.detail.product,
                cartid: state => state.cart.cartid
            })
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
                this.error = null
                this.loading = true
                this.$store.commit('detail/resetProduct')
                productApi.getProduct(this.$route.params.code)
                    .then(response => {
                        this.$store.commit('detail/setProduct', response.data)
                        this.breadcrumb = this.product.taxons.others
                        this.loading = false
                    })
                    .catch(error => this.error = error.toString())
            },
            async updateAfterAddToCart (productCode) {
                await cartApi.addToCart(productCode, this.cartid)
                let cart = await cartApi.getCart(this.cartid)
                this.$store.commit('cart/setCart', cart.data)

                this.loading = false
            },
            async addToCart(productCode) {
                this.loading = true
                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    await cartApi.pickUpCart(this.cartid);
                }

                await this.updateAfterAddToCart(productCode)
            }
        },
        components: {
            ClipLoader,
            Breadcrumb
        },
        mixins: [
            mixin
        ]
    }
</script>