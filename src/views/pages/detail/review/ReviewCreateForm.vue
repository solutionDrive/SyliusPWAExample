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
                <input v-model="title" class="input" type="text" placeholder="Title">
            </div>
        </div>
        <div class="field">
            <div class="control">
                <textarea v-model="comment" class="textarea" placeholder="Write your own review"></textarea>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input v-model="email" class="input" type="email" placeholder="Email">
            </div>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button @click="submit" class="button is-link">Add</button>
            </div>
        </div>
        <div class="section" v-if="loading"><clip-loader></clip-loader></div>
        <div v-if="error" class="notification is-danger">{{ error }}</div>
        <div v-if="added" class="notification is-success">new review created successfully!</div>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    import StarRating from 'vue-star-rating'
    import Validator from 'email-validator'
    import {reviewApi} from '@/api'

    export default {
        name: 'review-create-form',
        data () {
            return {
                loading: false,
                error: '',
                added: false,
                title: '',
                rating: 0,
                comment: '',
                email: ''
            }
        },
        props: [
            'productName'
        ],
        methods: {
            validate () {
                return this.title !== '' && this.rating > 0 && this.comment !== '' && Validator.validate(this.email)
            },
            async submit () {
                if (this.validate() === false) {
                    this.error = 'form validation failed'
                    return
                }

                try {
                    this.loading = true
                    await reviewApi.addReviewForSlug(
                        this.$route.params.slug,
                        this.title,
                        this.rating,
                        this.comment,
                        this.email
                    )
                    this.added = true
                } catch (error) {
                    this.error = error.toString()
                }

                this.loading = false
            }
        },
        components: {
            StarRating,
            ClipLoader
        }
    }
</script>