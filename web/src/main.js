import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './scss/style.scss'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import dayjs from 'dayjs'

Vue.filter('shortDate', (val, delimiter = '-') => dayjs(val).format(`MM${delimiter}DD`))

new Vue({
  render: h => h(App),
}).$mount('#app')
