<template>
    <div>
        <ul class="category--list" v-if="taxons && taxons.length">
            <li class="list--item main" v-for="taxon in taxons">
                <a href="#" @click="fetchProducts(taxon.code)"><span>{{ taxon.code }}</span></a>

                <ul class="subcategory--list" v-if="taxon.children && taxon.children.length">
                    <li class="list--item sub" v-for="child in taxon.children">
                        <a href="#" @click="fetchProducts(child.code)"><span>{{ child.code }}</span></a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="container" v-if="products && products.length">
            <div class="row">
                <div class="col-sm-3" v-for="product in products">
                    <img style="width: 100%; height: auto;" :src="'http://127.0.0.1:8000/media/image/' + product.images[0].path" />
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.slug }}</p>
                    <button @click="addToCart(product.code)" class="btn btn-primary">add to cart</button>
                </div>
            </div>
        </div>

        <button @click="fetchCart()">showCart</button>
        <div class="container">
            {{ cart.tokenValue }}
        </div>
    </div>
</template>

<script>
    import api from './../api'
    import axios from 'axios'
    import uuid from 'uuid-random'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                taxons: [],
                products: [],
                cart:{}
            }
        },
        computed: mapState([
            'cartid'
        ]),
        created() {
            api.getAllCategories().then( response => this.taxons = response.data[0].children)

            this.fetchProducts('mugs')
        },
        methods: {
            fetchProducts(code) {
                api.getProducts(code).then( response => this.products = response.data.items)
            },
            addToCart(productCode) {
                if (this.cartid === '') {
                    this.$store.commit('initCartId')
                }
                api.addToCart(productCode, this.cartid)
            },
            fetchCart() {
                api.getCart(this.cartid).then(response => this.cart = response);
            }
        }
    }
</script>

<style>
    .category--list {
        width: 100%;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .category--list .list--item {
        width: 25%;
        color: #fff;
        padding: 0 10px;
        text-align: left;
        background: #2c3e50;
        box-sizing: border-box;
    }

    .category--list .list--item a {
        text-decoration: none;
        color: #fff;
    }
    
    .category--list .list--item.main {
        float: left;
        overflow: hidden;
    }
    
    .category--list .list--item.sub {

    }

    .subcategory--list {
        list-style: none;
    }
</style>