import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './style.scss'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import dayjs from 'dayjs'
import router from './router'

Vue.filter('shortDate', (val, delimiter = '-') => dayjs(val).format(`MM${delimiter}DD`))

import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
