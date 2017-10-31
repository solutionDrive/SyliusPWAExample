<template>
    <div v-if="!isEmpty(list)">
        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <router-link :to="getPageLink(current - 1)"
                         :disabled = "current === 1"
                         class="pagination-previous"
                         exact>
                Previous
            </router-link>
            <router-link :to="getPageLink(current + 1)"
                         :disabled = "current === pages"
                         class="pagination-next"
                         exact>
                Next page
            </router-link>
            <ul class="pagination-list">
                <li v-for="page in pages">
                    <router-link v-if="showItem(page)"
                                 :to="getPageLink(page)"
                                 class="pagination-link"
                                 :class="{'is-current': page === current}">
                        {{ page }}
                    </router-link>
                    <span v-else-if="ellipseItem(page)" class="pagination-ellipsis">&hellip;</span>
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
            showItem (page) {
                return this.firstItem(page) || this.lastItem(page) || this.itemInRange(page)
            },
            firstItem (page) {
                return page === 1
            },
            lastItem (page) {
                return page === this.pages
            },
            itemInRange (page) {
                return Math.abs(page - this.current) < 2
            },
            ellipseItem (page) {
                return Math.abs(page - this.current) === 2
            },
            isEmpty
        }
    }
</script>