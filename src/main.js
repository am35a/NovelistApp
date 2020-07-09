import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'

import './assets/css/normalize.css'
import './assets/css/bootstrap-utilities.css' // these are temporary classes and all unnecessary will be deleted
import './assets/less/main.less'

Vue.config.productionTip = false

Vue.use(Vue2TouchEvents)

new Vue({
    render: h => h(App)
}).$mount('#app')
