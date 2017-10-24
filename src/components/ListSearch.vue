<template>
    <div class="box">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input" type="text" placeholder="Find a product on this page">
            </div>
            <div class="control">
                <a class="button is-link">
                    Search
                </a>
            </div>
            <div class="control">
                <a class="button is-warning">
                    Clear
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'list-search'
    }
</script>