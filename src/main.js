import Vue from 'vue'
import App from './App.vue'

import './assets/css/normalize.css'
import './assets/css/bootstrap-utilities.css' // these are temporary classes and all unnecessary will be deleted
import './assets/less/main.less'

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
