<template>
    <div>
        <div class="control">
            <button @click="addToCart()" class="button is-link is-medium" :class="{'is-loading': loading}">
                add to cart
            </button>
        </div>

        <div v-if="error" class="notification is-danger">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        name: 'detail-add-to-cart',
        data () {
            return {
                loading: false,
                error: ''
            }
        },
        props: [
            'product',
            'variantCode',
            'quantity'
        ],
        methods: {
            async addToCart () {
                if (!this.variantCode) {
                    this.error = 'choose a variant'
                    return
                }
                this.loading = true
                await this.$store.dispatch('cart/initCart').catch(error => {
                    this.error = error.toString()
                })
                await this.$store.dispatch('cart/addToCart', {
                    productCode: this.product.code,
                    quantity: this.quantity,
                    variantCode: this.variantCode
                }).catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            }
        }
    }
</script>