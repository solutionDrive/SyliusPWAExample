// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Detail from './components/Detail'
import Home from './components/Home'

Vue.config.productionTip = false

Vue.component('app', App)
Vue.component('product-list', ProductList)
Vue.component('cart', Cart)
Vue.component('detail', Detail)
Vue.component('home', Home)

new Vue({
  el: '#app',
  router,
  store
})
