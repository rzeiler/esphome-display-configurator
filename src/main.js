import Vue from 'vue'
import App from './App.vue'

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import bootstrap from "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./scss/app.scss"

import "../node_modules/@mdi/font/css/materialdesignicons.css"
import './registerServiceWorker'

import drag from "v-drag"

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    setTooltip() {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      console.log(tooltipList);
    },
  }
})

Vue.use(drag, {
  eventClass: {
    down: "is-pressed",
    move: "is-moving"
  }
});

new Vue({
  render: h => h(App)

}).$mount('#app')
