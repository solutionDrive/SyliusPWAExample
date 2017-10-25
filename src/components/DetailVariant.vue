<template>
    <div>
        <div class="columns">
            <div class="column is-one-third">
                <h3 class="title">{{price}}</h3>
            </div>
            <div class="column is-two-thirds">
                <small>{{product.code}}</small>
            </div>
        </div>

        <div class="box">
            <div class="field">
                <label class="label">Variant</label>
                <div class="control">
                    <div class="select is-fullwidth" :class="{ 'is-danger': error }">
                        <select v-model="variantCode" v-on:change="resetError">
                            <option v-for="variant in product.variants"
                                    :value="variant.code">
                                {{getVariantName(variant)}}
                            </option>
                        </select>
                    </div>
                </div>
                <p class="help is-danger" v-if="error">{{error}}</p>
            </div>
            <div class="field">
                <label class="label">Quantity</label>
                <div class="control">
                    <input v-model="quantity" class="input" type="number" min="1">
                </div>
            </div>
            <div class="control">
                <button @click="addToCart()" class="button is-link">add to cart</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {cartApi} from '@/api'
    import mixin from '@/mixins/utils'

    export default {
        name: 'detail-variant',
        data () {
            return {
                loading: false,
                error: '',
                quantity: 1,
                variantCode: ''
            }
        },
        props: [
            'product'
        ],
        computed: {
            ...mapState({
                cartid: state => state.cart.cartid
            }),
            price () {
                return this.getFormattedPrice(this.product.variants[this.variantCode].price)
            }
        },
        created () {
            this.variantCode = this.product.code + '-variant-0'
        },
        methods: {
            getVariantName (variant) {
                return Object.values(variant.nameAxis).join()
            },
            resetError () {
                this.error = ''
            },
            async addToCart() {
                if (!this.variantCode) {
                    this.error = 'choose a variant'
                    return
                }

                if (this.cartid === '') {
                    this.$store.commit('cart/initCartId')
                    await cartApi.pickUpCart(this.cartid);
                }

                await this.updateAfterAddToCart()
            },
            async updateAfterAddToCart () {
                try {
                    this.loading = true
                    await cartApi.addToCart(this.cartid, this.product.code, this.quantity, this.variantCode)
                    let cart = await cartApi.getCart(this.cartid)
                    this.$store.commit('cart/setCart', cart.data)
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            }
        },
        mixins: [
            mixin
        ]
    }
</script>