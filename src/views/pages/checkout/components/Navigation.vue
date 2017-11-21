<template>
    <div class="container">
        <div class="menu box">
            <ul class="menu-list" v-for="link in links">
                <li>
                    <router-link :to="{name: link.linkName}" class="has-text-centered navi-link" 
                                 :class="{'is-completed':isCompleted(link)}"
                    >
                        <h4 class="subtitle is-4 is-marginless">{{ link.name }}</h4>
                        <div><small>{{link.description}}</small></div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'checkout-navigation',
        data () {
            return {
                links: [
                    {
                        name: 'Address',
                        linkName: 'address',
                        description: 'Fill in your billing and shipping addresses',
                        step: 1
                    },
                    {
                        name: 'Shipping',
                        linkName: 'shipping',
                        description: 'Choose how your goods will be delivered',
                        step: 2
                    },
                    {
                        name: 'Payment',
                        linkName: 'payment',
                        description: 'Choose how you will pay',
                        step: 3
                    },
                    {
                        name: 'Complete',
                        linkName: 'complete',
                        description: 'Review and confirm your order',
                        step: 4
                    }
                ]
            }
        },
        computed: {
            activeLink () {
                return this.links.find(link => link.linkName === this.$route.name)
            }
        },
        methods: {
            isCompleted (current) {
                return current.step < this.activeLink.step
            }
        }
    }
</script>

<style lang="scss" scoped>
    $navi-faded-color: rgba(40,40,40,.3);
    $navi-color: #4a4a4a;
    $navi-active-background-color: #f3f4f5;

    .navi-link {
        pointer-events: none;
        color: $navi-faded-color;
        
        .subtitle {
            color: $navi-faded-color;
        }

        &.is-completed,
        &.router-link-active {
            color: $navi-color;
            pointer-events: auto;

            .subtitle {
                color: $navi-color;
            }
        }

        &.router-link-active {
            background: $navi-active-background-color;
        }
    }
</style>
