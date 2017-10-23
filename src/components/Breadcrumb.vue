<template>
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/" >{{ appName }}</router-link></li>
                <li v-for="code in breadcrumb">
                    <router-link :to="'/list/' + code">{{ code }}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import appConfig from '@/config'
    import {categoryApi} from '@/api'

    export default {
        data () {
            return {
                appName: appConfig.appName,
                breadcrumb: []
            }
        },
        props: {
            'productBreadcrumb': ''
        },
        watch: {
            '$route': 'getBreadcrumbFromApi',
            'productBreadcrumb': 'getBreadcrumbFromApi'
        },
        created () {
            this.getBreadcrumbFromApi()
        },
        methods: {
            getBreadcrumbFromApi () {
                // breadcrumb on list page
                this.getListBreadcrumb()

                // breadcrumb on details page
                if (this.productBreadcrumb) {
                    this.breadcrumb = this.productBreadcrumb
                }
            },
            getListBreadcrumb () {
                this.$store.subscribe((mutation, state) => {
                    if (mutation.type === 'list/setCategory') {
                        this.breadcrumb = []
                        let parent = this.$store.state.list.category.parentTree
                        this.addChildrenToBreadcrumb(parent)
                    }
                })
            },
            addChildrenToBreadcrumb (parent) {
                if (parent.children.length) {
                    this.breadcrumb.push(parent.children[0].code)
                    this.addChildrenToBreadcrumb(parent.children[0])
                }
            }
        }
    }
</script>
