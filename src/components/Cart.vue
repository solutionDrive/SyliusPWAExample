<template>
    <div>
        <div v-if="emptyCart">cart empty</div>
        <div v-else>
            <ul>
                <li v-for="item in cart.items">
                    <p>Name: {{item.product.name}}</p>
                    <p>Price: {{item.total / 100 }}{{ cart.currency }}</p>
                </li>
            </ul>
            <p>ship Price: {{ cart.shipments[0].method.price.current / 100 }}{{ cart.currency }}</p>
            <p>total Price: {{ cart.totals.total / 100 }}{{ cart.currency }}</p>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import api from './../api'

    export default {
        data () {
            return {
                cart: {},
                emptyCart: true
            }
        },
        computed: {
            ...mapState([
                'cartid'
            ])
        },
        created () {
            if (this.cartid !== '') {
                api.getCart(this.cartid).then(response => {
                    this.cart = response.data
                    this.emptyCart = false
                })
            }
        }
    }
</script>