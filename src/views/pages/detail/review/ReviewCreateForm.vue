<template>
    <div>
        <h4 class="title">Write your own review</h4>
        <p class="subtitle">
            You are reviewing
            <strong>{{productName}}</strong>
        </p>
        <hr>
        <div class="field">
            <div class="control">
                <star-rating :star-size = 20
                             :show-rating = false
                             v-model="rating"
                >
                </star-rating>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input class="input" type="text" placeholder="Title">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <textarea class="textarea" placeholder="Write your own review"></textarea>
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
    import StarRating from 'vue-star-rating'

    export default {
        name: 'review-create-form',
        data () {
            return {
                rating: 0
            }
        },
        props: [
            'productName'
        ],
        components: {
            StarRating
        }
    }
</script>