<template>
    <div class="container">
        <ul class="nav nav-pills" v-if="taxons && taxons.length">
            <li v-for="taxon in taxons"
                class="nav-item" :class="{dropdown : taxon.hasChildren}">

                <router-link :to="'/list/' + taxon.code"
                             class="nav-link" :class="{'dropdown-toggle' : taxon.hasChildren}"
                >
                    <span>{{ taxon.code }}</span>
                </router-link>

                <!--@todo: show/hide dropdown-->
                <!--<div class="dropdown-menu" v-if="taxon.hasChildren">-->
                    <!--<div v-for="child in taxon.children">-->
                        <!--<router-link :to="'/list/' + child.code" class="dropdown-item">{{ child.code }}</router-link>-->
                    <!--</div>-->
                <!--</div>-->
            </li>
        </ul>
        <hr>
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