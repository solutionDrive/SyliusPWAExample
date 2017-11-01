<template>
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul v-if="!isEmpty(breadcrumb)">
                <li><router-link :to="{name: 'home'}" >Home</router-link></li>
                <li v-for="code in breadcrumb">
                    <!--@todo use category name instead of code in the breadcrumb like sidebar-->
                    <router-link :to="{name: 'list', params: {code: code}}">{{code}}</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import {isEmpty} from 'lodash'

    export default {
        data () {
            return {
                breadcrumb: []
            }
        },
        created () {
            this.initBreadcrumb()
        },
        methods: {
            initBreadcrumb () {
                this.$store.subscribe((mutation, state) => {
                    if (mutation.type === 'list/setCategory') {
                        this.breadcrumb = []
                        const parent = state.list.category.parentTree
                        this.addChildrenToBreadcrumb(parent)
                        return
                    }
                    if (mutation.type === 'detail/setProduct') {
                        this.breadcrumb = []
                        const product = state.detail.product
                        this.breadcrumb = product.taxons.others
                    }
                })
            },
            addChildrenToBreadcrumb (parent) {
                if (parent.children.length) {
                    this.breadcrumb.push(parent.children[0].code)
                    this.addChildrenToBreadcrumb(parent.children[0])
                }
            },
            isEmpty
        }
    }
</script>
