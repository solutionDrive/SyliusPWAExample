// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ProductList from './components/ProductList'
import Category from './components/Category'
import Cart from './components/Cart'

Vue.config.productionTip = false

Vue.component('app', App)
Vue.component('product-list', ProductList)
Vue.component('category', Category)
Vue.component('cart', Cart)

new Vue({
  el: '#app',
  router,
  store
})
