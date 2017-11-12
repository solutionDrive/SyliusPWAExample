<template>
    <div class="is-pulled-right">
        <router-link :to="{name: 'cart'}" class="button is-dark">
            <span>{{ formarttedTotal }}</span>
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
            ...mapState({
                cart: state => state.cart.cart
            }),
            currency () {
                return this.isEmpty(this.cart) ? 'USD' : this.cart.currency
            },
            total () {
                return this.isEmpty(this.cart) ? 0 : this.cart.totals.items
            },
            formarttedTotal () {
                return this.$syliuspwa.price.formattedPrice(this.currency, this.total)
            },
            itemCount () {
                return this.isEmpty(this.cart) ? 0 : this.cart.items.length
            }
        },
        methods: {
            showMiniCart () {
                return this.isEmpty(this.cart)
            },
            isEmpty
        }
    }
</script>