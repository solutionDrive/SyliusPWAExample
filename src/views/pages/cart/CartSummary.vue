<template>
    <div class="box" v-if="!isEmpty(cart)">
        <table class="table is-fullwidth">
            <thead>
                <th><h3 class="subtitle">Summary</h3></th>
                <th>&nbsp;</th>
            </thead>
            <tbody>
                <tr>
                    <td>items:</td>
                    <td class="has-text-right">{{$syliuspwa.price.formattedPrice(cart.currency, cart.totals.items)}}</td>
                </tr>
                <tr>
                    <td>tax:</td>
                    <td class="has-text-right">{{$syliuspwa.price.formattedPrice(cart.currency, cart.totals.taxes)}}</td>
                </tr>
                <tr>
                    <td>shipping:</td>
                    <td class="has-text-right">{{$syliuspwa.price.formattedPrice(cart.currency, cart.totals.shipping)}}</td>
                </tr>
                <tr>
                    <td>discount:</td>
                    <td class="has-text-right">{{$syliuspwa.price.formattedPrice(cart.currency, cart.totals.promotion)}}</td>
                </tr>
            </tbody>
            <tfoot>
                <th><h3 class="subtitle">Order total:</h3></th>
                <td class="has-text-right">{{$syliuspwa.price.formattedPrice(cart.currency, cart.totals.total)}}</td>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'

    export default {
        name: 'cart-summary',
        props: [
            'cart'
        ],
        methods: {
            isEmpty
        }
    }
</script>