<template>
    <div class="is-clipped rating-link-wrapper content">
        <star-rating :star-size = 15
                     :show-rating = false
                     :read-only = true
                     :inline = true
                     v-model="rating"
        >
        </star-rating>
        <router-link :to="{name: 'review-index', params: {slug: this.$route.params.slug}}">{{count}} Reviews</router-link>
        <router-link :to="{name: 'review-create', params: {slug: this.$route.params.slug}}">Add your review</router-link>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: 'detail-rating-link',
        props: [
            'rating',
            'count'
        ],
        components: {
            StarRating
        }
    }
</script>