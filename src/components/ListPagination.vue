<template>
    <div v-if="!isEmpty(list)">
        <nav class="pagination" role="navigation" aria-label="pagination">
            <a class="pagination-previous" :disabled = "current === 1">Previous</a>
            <a class="pagination-next" :disabled = "current === pages">Next page</a>
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
                return this.$route.path + '?page=' + encodeURIComponent(page)
            },
            isEmpty
        }
    }
</script>