<template>
    <div>
        <mini-cart></mini-cart>
        <category></category>
        <div class="container">
            <hr>
            <h1 class="title">Homepage</h1>
        </div>
    </div>
</template>

<script>
    import MiniCart from "./MiniCart.vue";

    export default {
        components: {
            'mini-cart': MiniCart
        },
        name: "home"
    }
</script>