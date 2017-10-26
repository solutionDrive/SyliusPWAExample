<template>
    <div class="box">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input v-model="query"
                       class="input" type="text" placeholder="Find a product on this page">
            </div>
            <div class="control">
                <a class="button is-link">
                    Search
                </a>
            </div>
            <div class="control">
                <a class="button is-warning" >
                    Clear
                </a>
            </div>
        </div>
        <div>
            {{query}}
        </div>
    </div>
</template>

<script>
    export default {
        // @todo: still not implemented, need a search api + query parameter
        name: 'list-search',
        data () {
            return {
                query: ''
            }
        }
    }
</script>