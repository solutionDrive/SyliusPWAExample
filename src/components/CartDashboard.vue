<template>
    <div class="box" v-if="!isEmpty(cart)">
        <div class="table">
            <thead>
                <tr>
                    <th>item</th>
                    <th><abbr title="unit price">unit price</abbr></th>
                    <th><abbr title="quantity">Qty</abbr></th>
                    <th>&nbsp;</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart.items">
                    <td>
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-64x64">
                                    <img :src="imageUrl + item.product.images[0].path"
                                         :alt="item.product.name"
                                    >
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="content">
                                    <router-link :to="'/detail/' + item.product.code">{{ item.product.name }}</router-link>
                                    <p><small>{{item.product.code}}</small></p>
                                    <p><small>{{item.product.variants[0].axis[0]}}</small></p>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        {{item.product.variants[0].price.current / 100 + cart.currency}}
                    </td>
                    <td>{{item.quantity}}</td>
                    <td><a class="delete"></a></td>
                    <td>{{item.total / 100 + cart.currency}}</td>
                </tr>
            </tbody>
        </div>
        <div>
            @todo: apply coupon
        </div>
        <div>
            @todo: update cart button
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import appConfig from '@/config'

    export default {
        name: 'cart-dashboard',
        data () {
            return {
                imageUrl: appConfig.imageUrl
            }
        },
        props: [
            'cart'
        ],
        methods: {
            isEmpty
        }
    }
</script>