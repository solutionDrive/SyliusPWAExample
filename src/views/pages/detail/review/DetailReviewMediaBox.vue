<template>
    <article class="media">
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{item.author}}</strong>
                    <small>@todo created_at not available in the api</small>
                    <star-rating :star-size = 13
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
        name: 'detail-review-media-box',
        props: [
            'item'
        ],
        components: {
            StarRating
        }
    }
</script>