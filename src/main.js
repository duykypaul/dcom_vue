import './plugins';
import './assets/style.css';
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
Vue.use(Vuelidate);
Vue.use(Notifications);
import router from "./router";
import store from "./store";

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
