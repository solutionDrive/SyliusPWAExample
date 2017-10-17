<template>
    <div>
        <category></category>

        <!--@todo: loading icon-->
        <div v-if="loading">Loading</div>
        <div class="container">
            <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
        </div>
        <div v-if="product">
            <img :src="'http://demo.sylius.org/media/image/' + product.images[0].path"
                 :alt="product.name"
                 style="width: 400px;"
            >
            <p>{{product.name}}</p>
        </div>
    </div>
</template>

<script>
    import api from './../api'

    export default {
        data () {
            return {
                product: {},
                error: '',
                loading: false
            }
        },
        created () {
            this.fetchDataFromApi()
        },
        watch: {
            '$store': 'fetchDataFromApi'
        },
        methods: {
            fetchDataFromApi () {
                this.error = this.product = null
                this.loading = true
                api.getProduct(this.$route.params.code)
                    .then(response => this.product = response.data)
                    .catch(error => this.error = error.toString())
                this.loading = false
            }
        }
    }
</script>