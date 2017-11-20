<template>
    <div>
        <div class="box">
            <h3 class="subtitle">Cart items</h3>
            <hr class="is-marginless">
            <div class="box" v-for="item in cart.items">
                <div><strong>{{ item.product.name }}</strong></div>
                <nav class="level is-mobile">
                    <div class="level-left"></div>
                    <div class="level-right">
                        <span class="level-item">
                            <label>Qty: </label>
                            <span>{{item.quantity}}</span>
                        </span>
                        <span class="level-item">
                            Subtotal: {{$syliuspwa.price.formattedPrice(cart.currency, item.total)}}
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'checkout-cart',
        computed: {
            ...mapState({
                cart: state => state.cart.cart
            })
        }
    }
</script>
