<template>
    <div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div class="columns is-multiline" v-if="!isEmpty(products)">
            <div class="column is-one-quarter" v-for="product in products.slice(0,4)">
                <product-card :product = product></product-card>
            </div>
        </div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import {isEmpty} from 'lodash'
    import {productApi} from '@/api'
    import ProductCard from '@/views/components/ProductCard'

    export default {
        name: 'latest-products',
        data () {
            return {
                loading: false,
                products: []
            }
        },
        created () {
            this.fetchDataFromApi()
        },
        methods: {
            async fetchDataFromApi () {
                this.loading = true

                try {
                    const products = await productApi.getLatestProducts()
                    this.products = products.data.items
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            },
            isEmpty
        },
        components: {
            ClipLoader,
            ProductCard
        }
    }
</script>