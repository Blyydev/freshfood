/*
import Vue from 'vue'
import App from './App.vue'

import VueCordova from 'vue-cordova'
Vue.use(VueCordova)

new Vue({
	render: h => h(App)
}).$mount('#app')

*/

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')