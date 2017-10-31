<template>
    <aside class="menu" v-if="!isEmpty(category)">
        <ul class="menu-list">
            <li>
                <router-link :to="{name: 'list', params: {code: category.code}}" class="is-active">
                    {{ category.name }}
                </router-link>
                <ul v-if="category.children.length">
                    <li v-for="child in category.children">
                        <router-link :to="{name: 'list', params: {code: child.code}}">
                            {{ child.name }}
                        </router-link>
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