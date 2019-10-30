import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueDisqus from 'vue-disqus'

Vue.use(BootstrapVue)
Vue.use(VueDisqus)
Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {'Content-Type': 'application/json'}
})

Vue.prototype.$http = instance

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
