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
    import {mapState} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import appConfig from '@/config'
    import mixin from '@/mixins/utils'
    import {productApi, cartApi} from '@/api'
    import Breadcrumb from '@/components/Breadcrumb'

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
            resetDetail () {
                this.error = null
                this.$store.commit('detail/resetProduct')
            },
            async fetchDataFromApi () {
                this.resetDetail();
                this.loading = true
                try {
                    let product = await productApi.getProduct(this.$route.params.code)
                    this.$store.commit('detail/setProduct', product.data)
                } catch (error) {
                    this.error = error.toString()
                }
                this.loading = false
            },
            async addToCart(productCode) {
                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    await cartApi.pickUpCart(this.cartid);
                }

                await this.updateAfterAddToCart(productCode)
            },
            async updateAfterAddToCart (productCode) {
                try {
                    this.loading = true
                    await cartApi.addToCart(productCode, this.cartid)
                    let cart = await cartApi.getCart(this.cartid)
                    this.$store.commit('cart/setCart', cart.data)
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
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