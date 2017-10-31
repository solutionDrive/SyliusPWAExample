<template>
    <aside class="menu" v-if="!isEmpty(category)">
        <ul class="menu-list">
            <li>
                <router-link :to="'/list/' + category.code" class="is-active">{{ category.name }}</router-link>
                <ul v-if="category.children.length">
                    <li v-for="child in category.children">
                        <router-link :to="'/list/' + child.code">{{ child.name }}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

<script>
    import {isEmpty} from 'lodash'

    export default {
        name: 'list-sidebar',
        props: [
            'category'
        ],
        methods: {
            isEmpty
        }
    }
</script>