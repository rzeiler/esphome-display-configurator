import Vue from 'vue'
import App from './App.vue'

import "./scss/app.scss"

import "../node_modules/@mdi/font/css/materialdesignicons.css"
import './registerServiceWorker'


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
   
}).$mount('#app')
