<template>
    <div>
        <nav class="level">
            <div class="level-left"></div>
            <div class="level-right">
                <p class="level-item">
                    <router-link to="/cart" class="button is-light">
                        <span>{{ total + currency}}</span>
                    </router-link>
                </p>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'miniCart',
        data: function () {
            return {
                total: '0.00',
                currency: 'USD'
            }
        },
        computed: mapState([
            'cartid'
        ])
    }
</script>