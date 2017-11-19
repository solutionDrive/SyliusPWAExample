<template>
    <div>
        <div class="table is-narrow is-hidden-mobile">
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
                                <router-link :to="{name: 'detail', params: {slug: item.product.slug}}">
                                    {{ item.product.name }}
                                </router-link>
                                <p><small>{{item.product.code}}</small></p>
                                <p><small>{{item.product.variants[0].axis[0]}}</small></p>
                            </div>
                        </div>
                    </div>
                </td>
                <td>{{$syliuspwa.price.formattedVariantPrice(item.product.variants[0].price)}}</td>
                <td>
                    <input v-if="editable" class="input" type="number" v-model="item.quantity">
                    <span v-else>{{item.quantity}}</span>
                </td>
                <td>
                    <a v-if="editable" class="delete" @click="removeItem(item.id)"></a>
                    <span v-else>&nbsp;</span>
                </td>
                <td>{{$syliuspwa.price.formattedPrice(cart.currency, item.total)}}</td>
            </tr>
            </tbody>
        </div>
        <div class="is-hidden-tablet mobile-cart-items">
            <div class="box" v-for="item in cart.items">
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
                            <router-link :to="{name: 'detail', params: {slug: item.product.slug}}">
                                {{ item.product.name }}
                            </router-link>
                            <small>{{item.product.variants[0].axis[0]}}</small>
                            <p><small>{{item.product.code}}</small></p>
                            <nav class="level is-mobile">
                                <div class="level-left"></div>
                                <div class="level-right">
                                    <span class="level-item">
                                        <label>Qty: </label>
                                        <input v-if="editable" class="input item-quantity" type="number" v-model="item.quantity">
                                        <span v-else>{{item.quantity}}</span>
                                    </span>
                                    <span class="level-item">
                                        total: {{$syliuspwa.price.formattedPrice(cart.currency, item.total)}}
                                    </span>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="media-right" v-if="editable">
                        <a class="delete" @click="removeItem(item.id)"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div v-if="error" class="notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    import appConfig from '@/config'

    export default {
        name: 'cart-items',
        data () {
            return {
                // @todo: need a mixin or plugin for async loading and error handling
                loading: false,
                error: '',
                imageUrl: appConfig.imageUrl
            }
        },
        props: {
            cart: Object,
            editable: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            async removeItem (itemId) {
                this.loading = true
                await this.$store.dispatch('cart/removeItem', itemId).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">
    .item-quantity {
        width: 3rem;
    }
    .mobile-cart-items {
        margin-bottom: 1.5rem;
    }
</style>