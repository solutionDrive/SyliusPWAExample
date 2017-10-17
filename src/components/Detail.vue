<template>
    <div>
        <category></category>
        <div>
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
                product: {}
            }
        },
        created () {
            api.getProduct(this.$route.params.code).then(response => this.product = response.data);
        }
    }
</script>