<template>
    <div class="is-pulled-right" v-if="!isCartEmpty()">
        <router-link :to="{name: 'cart'}" class="button is-dark">
            <span>{{ total }}</span>
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
                return this.$syliuspwa.price.formattedPrice(this.cart.currency, this.cart.totals.items)
            },
            itemCount () {
                return this.cart.items.length
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