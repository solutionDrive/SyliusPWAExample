<template>
    <div class="is-clipped rating-link-wrapper">
        <star-rating :star-size = 15
                     :show-rating = false
                     :read-only = true
                     :inline = true
                     v-model="rating"
        >
        </star-rating>
        <router-link :to="'/detail/' + this.$route.params.slug + '/review/'">@todo: #Reviews</router-link>
        <a href="#">Add your review</a>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: 'detail-rating-link',
        props: [
            'rating'
        ],
        components: {
            StarRating
        }
    }
</script>

<style lang="scss">
    .rating-link-wrapper {
        margin-bottom: 1em;
    }
</style>