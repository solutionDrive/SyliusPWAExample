<template>
    <div class="container">
        <div class="tabs margin-top">
            <ul v-if="taxons && taxons.length">
                <li v-for="taxon in taxons" :class="{'is-active' : taxon.isActive}">
                    <router-link :to="'/list/' + taxon.code">
                        <span>{{ taxon.code }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {categoryApi} from '@/api'

    export default {
        data () {
            return {
                taxons: []
            }
        },
        watch: {
            '$route': 'fetchDataFromApi'
        },
        created () {
            // @todo: check cache (state) first before each time fetching from api
            this.fetchDataFromApi()
        },
        methods: {
            fetchDataFromApi () {
                categoryApi.getAllCategories().then(response => {
                    this.taxons = response.data[0].children
                    this.taxons.forEach(taxon => {
                        taxon.hasChildren = !!(taxon.children && taxon.children.length)
                        taxon.isActive = taxon.code === this.$route.params.code
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 24px;
    }
</style>