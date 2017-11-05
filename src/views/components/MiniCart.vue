<template>
    <div class="is-pulled-right">
        <router-link :to="{name: 'cart'}" class="button is-dark">
            <span>{{ total + currency}}</span>
            <span v-if="itemCount">
                , {{ itemCount }} item
            </span>
        </router-link>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {isEmpty} from 'lodash'

    export default {
        name: 'miniCart',
        computed: {
            total () {
                return this.isCartEmpty() ? '0.00' : this.cart.totals.items / 100
            },
            currency () {
                return this.isCartEmpty() ? 'USD' : this.cart.currency
            },
            itemCount () {
                return this.isCartEmpty() ? 0 : this.cart.items.length
            },
            ...mapState({
                cart: state => state.cart.cart
            })
        },
        methods: {
            isCartEmpty () {
                return this.isEmpty(this.cart) || this.cart.items.length === 0
            },
            isEmpty
        }
    }
</script>