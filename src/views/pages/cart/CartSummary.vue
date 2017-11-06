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
                    <td>{{cart.totals.items / 100 + cart.currency}}</td>
                </tr>
                <tr>
                    <td>tax:</td>
                    <td>{{cart.totals.taxes / 100 + cart.currency}}</td>
                </tr>
                <tr>
                    <td>shipping:</td>
                    <td>{{cart.totals.shipping / 100 + cart.currency}}</td>
                </tr>
                <tr>
                    <td>discount:</td>
                    <td>{{cart.totals.promotion / 100 + cart.currency}}</td>
                </tr>
            </tbody>
            <tfoot>
                <th>
                    <h3 class="subtitle">Order total:</h3>
                </th>
                <td>
                    {{cart.totals.total / 100 + cart.currency}}
                </td>
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