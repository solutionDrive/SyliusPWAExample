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

    export default {
        data () {
            return {
                appName: appConfig.appName,
                breadcrumb: []
            }
        },
        watch: {
            '$route': 'initBreadcrumb'
        },
        created () {
            this.initBreadcrumb()
        },
        methods: {
            initBreadcrumb () {
                this.$store.subscribe((mutation, state) => {
                    if (mutation.type === 'list/setCategory') {
                        this.breadcrumb = []
                        let parent = state.list.category.parentTree
                        this.addChildrenToBreadcrumb(parent)
                        return
                    }
                    if (mutation.type === 'detail/setProduct') {
                        this.breadcrumb = []
                        let product = state.detail.product
                        this.breadcrumb = product.taxons.others
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
