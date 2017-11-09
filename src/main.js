// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/views/app/App'
import router from './router'
import store from './store'
import ClipLoader from 'vue-spinner/src/ClipLoader'
import SyliusPwa from '@/plugins/syliuspwa'

Vue.config.productionTip = false

// global components
Vue.component('app', App)
Vue.component('clip-loader', ClipLoader)

// global plugins
Vue.use(SyliusPwa)

new Vue({
    el: '#app',
    router,
    store
})
