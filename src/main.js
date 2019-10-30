import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import EventBus from './EventBus'
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

instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data.response
    } else {
      return response
    }
  },
  function (error) {
    if (error.response) {
      return Promise.reject(error.response.data.response)
    } else {
      return Promise.reject(error)
    }
  }
)

Vue.prototype.$http = instance
Vue.prototype.$bus = EventBus

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
