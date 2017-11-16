<template>
    <div class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-one-quarter">
                    <aside class="menu box">
                        <p class="menu-label">
                            Your Account
                        </p>
                        <ul class="menu-list">
                            <li v-for="page in accounts">
                                <router-link :to="{name: 'dashboard'}">
                                    {{ page.name }}
                                </router-link>
                            </li>
                        </ul>
                    </aside>
                </div>
                <div class="column">
                    <h3 class="title is-3">My account</h3>
                    <p class="subtitle">Manage your personal information and preferences</p>
                    <hr class="is-paddingless">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data () {
            return {
                accounts: [
                    {name: 'Dashboard', link: 'dashboard'},
                    {name: 'Personal information', link: 'personInfo'},
                    {name: 'Change password', link: 'changePassword'},
                    {name: 'Address book', link: 'addressBook'},
                    {name: 'Order history', link: 'orderHistory'}
                ]
            }
        }
    }
</script>