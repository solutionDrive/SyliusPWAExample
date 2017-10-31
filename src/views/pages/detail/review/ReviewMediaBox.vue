<template>
    <article class="media">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{item.author}}</strong>
                    <span>@todo created_at not available in the api</span>
                    <star-rating :star-size = 15
                                 :show-rating = false
                                 :read-only = true
                                 :inline = true
                                 v-model="item.rating"
                    >
                    </star-rating>
                    <br>
                    {{item.comment}}
                </p>
            </div>
        </div>
    </article>
</template>

<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: 'review-media-box',
        props: [
            'item'
        ],
        components: {
            StarRating
        }
    }
</script>