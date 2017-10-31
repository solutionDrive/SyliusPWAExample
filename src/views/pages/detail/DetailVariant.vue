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
                    <div class="select is-fullwidth">
                        <select v-model="variantCode">
                            <option v-for="variant in product.variants"
                                    :value="variant.code">
                                {{getVariantName(variant)}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Quantity</label>
                <div class="control">
                    <input v-model="quantity" class="input" type="number" min="1">
                </div>
            </div>
            <detail-add-to-cart
                :product = product
                :variantCode = variantCode
                :quantity = quantity
            >
            </detail-add-to-cart>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/utils'
    import DetailAddToCart from '@/views/pages/detail/DetailAddToCart'

    export default {
        name: 'detail-variant',
        data () {
            return {
                quantity: 1,
                variantCode: ''
            }
        },
        props: [
            'product'
        ],
        computed: {
            price () {
                return this.getFormattedPrice(this.product.variants[this.variantCode].price)
            }
        },
        created () {
            this.initVariant()
        },
        methods: {
            /**
             * @todo: is there a better way to get the first variant? what if no variant?
             */
            initVariant () {
                this.variantCode = this.product.code + '-variant-0'
            },
            getVariantName (variant) {
                return Object.values(variant.nameAxis).join()
            }
        },
        components: {
            DetailAddToCart
        },
        mixins: [
            mixin
        ]
    }
</script>