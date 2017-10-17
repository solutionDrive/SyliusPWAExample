<template>
    <div class="container">
        <!-- @todo: currently only root category and direct child category-->
        <ul class="category--list" v-if="taxons && taxons.length">
            <li class="list--item main" v-for="taxon in taxons">
                <router-link :to="'/list/' + taxon.code">{{ taxon.code }}</router-link>

                <ul class="subcategory--list" v-if="taxon.children && taxon.children.length">
                    <li class="list--item sub" v-for="child in taxon.children">
                        <router-link :to="'/list/' + child.code"><span>{{ child.code }}</span></router-link>
                    </li>
                </ul>
            </li>
        </ul>
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
            api.getAllCategories().then( response => this.taxons = response.data[0].children)
        }
    }
</script>

<style>
    .category--list {
        width: 100%;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .category--list .list--item {
        width: 25%;
        color: #fff;
        padding: 0 10px;
        text-align: left;
        background: #2c3e50;
        box-sizing: border-box;
    }

    .category--list .list--item a {
        text-decoration: none;
        color: #fff;
    }

    .category--list .list--item.main {
        float: left;
        overflow: hidden;
    }

    .category--list .list--item.sub {

    }

    .subcategory--list {
        list-style: none;
    }
</style>