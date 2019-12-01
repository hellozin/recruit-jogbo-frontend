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
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle, faEnvelope, faServer, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faGithubSquare, faSlack } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationCircle, faEnvelope, faGithubSquare, faServer, faSlack, faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueDisqus)

Vue.config.productionTip = false

const instance = axios.create({
  baseURL: 'http://www.recruit-jogbo-api.tk/api',
  // baseURL: 'http://localhost:8080/api',
  headers: {'Content-Type': 'application/json'}
})

instance.interceptors.request.use(
  function (config) {
    const apiToken = localStorage.getItem('apiToken')
    if (apiToken) {
      config.headers['api_key'] = `Bearer ${apiToken}`
    }
    return config
  },
  function (error) {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    const apiToken = response.config.headers.api_key
    if (apiToken) {
      localStorage.setItem('apiToken', apiToken.split(' ')[1])
    }
    if (response.data) {
      return response.data.response
    } else {
      return response
    }
  },
  function (error) {
    if (error.response) {
      const errorResponse = error.response.data.response
      if (errorResponse) {
        switch (errorResponse.status) {
          case 'UNAUTHORIZED':
            localStorage.removeItem('apiToken')
            localStorage.removeItem('username')
            window.location.href = '/login?error=unauth'
            break;
        }
      }
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
