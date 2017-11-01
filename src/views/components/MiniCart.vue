<template>
    <div>
        <nav class="level">
            <div class="level-left">
                <router-link :to="{name: 'home'}" >
                    <img src="../../assets/shop_logo.png" alt="sylius" class="shop-logo">
                </router-link>
            </div>
            <div class="level-right mini-cart">
                <p class="level-item">
                    <router-link :to="{name: 'cart'}" class="button is-dark">
                        <span>{{ total + currency}}</span>
                        <span v-if="itemCount">
                            , {{ itemCount }} item
                        </span>
                    </router-link>
                </p>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {isEmpty} from 'lodash'

    export default {
        name: 'miniCart',
        computed: {
            total () {
                return this.isEmpty(this.cart) ? '0.00' : this.cart.totals.items / 100
            },
            currency () {
                return this.isEmpty(this.cart) ? 'USD' : this.cart.currency
            },
            itemCount () {
                return this.isEmpty(this.cart) ? 0 : this.cart.items.length
            },
            ...mapState({
                cart: state => state.cart.cart
            })
        },
        methods: {
            isEmpty
        }
    }
</script>

<style>
    .level-right.mini-cart {
        display: flex;
    }
    .shop-logo {
        width: 10em;
        height: auto;
    }
</style>