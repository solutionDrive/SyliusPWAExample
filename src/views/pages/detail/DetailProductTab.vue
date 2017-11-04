<template>
    <div class="tabs is-boxed">
        <!--@todo: deactivate tab cache on localStorage-->
        <tabs :options="{ useUrlFragment: false }" cache-lifetime="0" class="container">
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
                    <p class="content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Aliquid aperiam at culpa deserunt eius enim eos et expedita inventore ipsum laboriosam minus,
                        officia perferendis quo recusandae repudiandae unde. Excepturi, minima.
                    </p>
                </div>
            </tab>
            <tab name="Reviews">
                <div class="box tab-box">
                    <div v-if="isEmpty(review)" class="content">
                        <div class="notification is-info">
                            <h4 class="title is-4">Info</h4>
                            <h6 class="subtitle is-6 no-margin-bottom">There are no reviews</h6>
                        </div>
                    </div>
                    <div v-else class="content">
                        <div v-for="item in review" class="content">
                            <review-media-box :item = item></review-media-box>
                        </div>
                    </div>
                    <div>
                        <router-link :to="{name: 'review-index', params: {slug: this.$route.params.slug}}"
                                     class="button" tag="button">
                            View more
                        </router-link>
                        <router-link :to="{name: 'review-create', params: {slug: this.$route.params.slug}}"
                                     class="button is-link" tag="button">
                            Add your review
                        </router-link>
                    </div>
                </div>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import {Tabs, Tab} from 'vue-tabs-component'
    import {isEmpty} from 'lodash'
    import ReviewMediaBox from '@/views/pages/detail/review/ReviewMediaBox'

    export default {
        name: 'detail-product-tab',
        props: [
            'review'
        ],
        methods: {
            isEmpty
        },
        components: {
            Tabs,
            Tab,
            ReviewMediaBox
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
        white-space: initial;
    }
    .tabs-component.container {
        width: 100%;
    }
    .content h6.no-margin-bottom {
        margin-bottom: 0;
    }
</style>