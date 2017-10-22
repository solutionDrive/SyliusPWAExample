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
    import api from '@/api'

    export default {
        data () {
            return {
                appName: appConfig.appName,
                breadcrumb: []
            }
        },
        props: {
            'taxonCode': '',
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
                if (this.taxonCode) {
                    this.getListBreadcrumb()
                }

                // breadcrumb on details page
                if (this.productBreadcrumb) {
                    this.breadcrumb = this.productBreadcrumb
                }
            },
            getListBreadcrumb () {
                api.getCategoryByCode(this.taxonCode).then((response) => {
                    this.breadcrumb = []
                    let category = response.data
                    let parent = category.parentTree
                    this.addChildrenToBreadcrumb(parent)
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
