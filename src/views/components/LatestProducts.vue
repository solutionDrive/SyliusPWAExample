<template>
    <div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div class="columns is-multiline" v-if="!isEmpty(products)">
            <div class="column is-one-quarter" v-for="product in products.slice(0,4)">
                <product-card :product="product"></product-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'
    import ProductCard from '@/views/components/ProductCard'
    import {mapState} from 'vuex'

    export default {
        name: 'latest-products',
        data () {
            return {
                loading: false
            }
        },
        computed: {
            ...mapState({
                products: state => state.shop.latestProducts
            })
        },
        created () {
            this.fetchDataFromApi()
        },
        methods: {
            async fetchDataFromApi () {
                // if cached, no need to call the api
                if (this.products && !isEmpty(this.products)) {
                    return
                }
                this.loading = true
                await this.$store.dispatch('shop/getLatestProducts').catch(error => {
                    this.error = error.toString()
                })
                this.loading = false
            },
            isEmpty
        },
        components: {
            ProductCard
        }
    }
</script>