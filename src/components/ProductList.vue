<template>
    <div>
        <category></category>
        <div class="container" v-if="products && products.length">
            <div class="row">
                <div class="col-sm-3" v-for="product in products">
                    <img style="width: 100%; height: auto;" :src="'http://demo.sylius.org/media/image/' + product.images[0].path" />
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.slug }}</p>
                    <router-link :to="'/detail/' + product.code">to details</router-link>
                    <button @click="addToCart(product.code)" class="btn btn-primary">add to cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './../api'
    import axios from 'axios'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                cart:{}
            }
        },
        computed: mapState([
            'cartid',
            'products'
        ]),
        created() {
            this.fetchProducts('mugs')
        },
        methods: {
            fetchProducts(code) {
                api.getProducts(code).then( response => this.$store.commit('setProducts',response.data.items))
            },
            addToCart(productCode) {
                if (this.cartid === '') {
                    this.$store.commit('initCartId')
                    api.pickUpCart(this.cartid).then(response => api.addToCart(productCode, this.cartid))
                } else {
                    api.addToCart(productCode, this.cartid)
                }
            },
            fetchCart() {
                api.getCart(this.cartid).then(response => this.cart = response);
            }
        }
    }
</script>