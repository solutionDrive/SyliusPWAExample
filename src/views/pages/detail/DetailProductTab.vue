<template>
    <div class="tabs is-boxed">
        <tabs :options="{ useUrlFragment: false }" class="container">
            <tab name="Details">
                <div class="box tab-box">
                    <p class="content">
                        @todo: details are currently not available from the api
                    </p>
                    <p class="content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis doloremque,
                        <br>
                        eveniet harum illum neque nobis nostrum placeat quidem quisquam repellat
                    </p>
                </div>
            </tab>
            <tab name="Attributes">
                <div class="box tab-box">
                    <p class="content">
                        @todo: attributes are currently not available from the api
                    </p>
                </div>
            </tab>
            <tab name="Reviews">
                <div class="box tab-box">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis doloremque, eveniet harum illum neque nobis nostrum placeat quidem quisquam repellat tempora ullam vel velit veniam. A ea fugit provident?
                </div>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import {Tabs, Tab} from 'vue-tabs-component'

    export default {
        name: 'detail-product-tab',
        components: {
            Tabs,
            Tab
        }
    }
</script>

<style>
    .tab-box {
        border-bottom: 1px solid #dbdbdb;
        border-left: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        border-radius: 0;
        -webkit-user-select: text;  /* Chrome all / Safari all */
        -moz-user-select: text;     /* Firefox all */
        -ms-user-select: text;      /* IE 10+ */
        user-select: text;
    }
</style>