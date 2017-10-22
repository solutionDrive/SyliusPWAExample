<template>
    <div>
        <nav class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <p class="level-item">
                    <router-link to="/cart" class="button is-dark">
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

    export default {
        name: 'miniCart',
        computed: {
            total () {
                return this.cartEmpty(this.cart) ? '0.00' : this.cart.totals.items / 100
            },
            currency () {
                return this.cartEmpty(this.cart) ? 'USD' : this.cart.currency
            },
            itemCount () {
                return this.cartEmpty(this.cart) ? 0 : this.cart.items.length
            },
            ...mapState({
                cart: state => state.cart.cart
            })
        },
        methods: {
            cartEmpty () {
                return Object.keys(this.cart).length === 0
            }
        }
    }
</script>