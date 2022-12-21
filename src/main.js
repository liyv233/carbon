import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@vant/touch-emulator';
import ElementUI from 'element-ui'
import Vant from 'vant'
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import jquery from "jquery";
import http from '../http'
import {Toast} from 'vant'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts



 	Vue.prototype.$ = jquery;
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$msg = Toast
Vue.use(Vant)
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
