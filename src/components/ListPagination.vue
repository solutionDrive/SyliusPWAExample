<template>
    <div v-if="!isEmpty(list)">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <router-link :to="getPageLink(current-1)"
                         :disabled = "current === 1"
                         class="pagination-previous"
                         exact>
                Previous
            </router-link>
            <router-link :to="getPageLink(current+1)"
                         :disabled = "current === pages"
                         class="pagination-next"
                         exact>
                Next page
            </router-link>
            <ul class="pagination-list">
                <li v-for="page in pages">
                    <router-link :to="getPageLink(page)"
                                 class="pagination-link"
                                 :class="{'is-current': page === current}">
                        {{ page }}
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'

    export default {
        name: 'list-pagination',
        props: [
            'list'
        ],
        computed: {
            current () {
                return this.list.page
            },
            pages () {
                return this.list.pages
            }
        },
        methods: {
            getPageLink (page) {
                if (page < 1) {
                    page = 1
                }
                return this.$route.path + '?page=' + encodeURIComponent(page)
            },
            isEmpty
        }
    }
</script>