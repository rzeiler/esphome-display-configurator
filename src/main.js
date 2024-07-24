import Vue from 'vue'
import App from './App.vue'

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import bootstrap from "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./scss/app.scss"

import "../node_modules/@mdi/font/css/materialdesignicons.css"
import './registerServiceWorker'
 

 
 

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    setTooltip() {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      /* eslint-disable */
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)) 
    }
  }
})

var hasFSAccess =  'chooseFileSystemEntries' in window || 'showOpenFilePicker' in window;

 
 
new Vue({
  render: h => h(App)

}).$mount('#app')
