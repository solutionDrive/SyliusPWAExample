<template>
    <div class="container">
        <nav class="tabs margin-top is-hidden-mobile">
            <ul v-if="hasTaxons">
                <li v-for="taxon in taxons" :class="{'is-active' : taxon.isActive}">
                    <router-link :to="{name: 'list', params: {code: taxon.code}}">
                        <span>{{ taxon.code }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
        <nav class="panel is-hidden-tablet">
            <div v-if="hasTaxons" v-for="taxon in taxons">
                <router-link :to="{name: 'list', params: {code: taxon.code}}"
                             :class="{'is-active' : taxon.isActive}" class="panel-block">
                    {{ taxon.code }}
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data () {
            return {
                error: ''
            }
        },
        computed: {
            ...mapState({
                taxons: state => state.shop.taxons
            }),
            hasTaxons () {
                return this.taxons && this.taxons.length
            }
        },
        watch: {
            '$route': 'getAllTaxons'
        },
        created () {
            this.getAllTaxons()
        },
        methods: {
            /**
             * dispatch getTaxons call if not cached
             *
             * @todo: set cache ttl
             */
            async getAllTaxons () {
                this.error = ''
                if (!this.hasTaxons) {
                    await this.$store.dispatch('shop/getTaxons').catch(error => {
                        this.error = error.toString()
                    })
                }

                this.initTaxons()
            },
            initTaxons () {
                this.taxons.forEach(taxon => {
                    taxon.hasChildren = !!(taxon.children && taxon.children.length)
                    taxon.isActive = taxon.code === this.$route.params.code
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