<template>
    <div class="container">
        <div class="tabs is-toggle margin-top">
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
    import api from './../api'
    import axios from 'axios'

    export default {
        data() {
            return {
                taxons: []
            }
        },
        created() {
            api.getAllCategories().then( response => {
                this.taxons = response.data[0].children
                this.taxons.forEach(taxon => {
                    taxon.hasChildren = !!(taxon.children && taxon.children.length)
                })
            })
        }
    }
</script>

<style>
    .nav.nav-pills {
        background: #eee;
    }
</style>