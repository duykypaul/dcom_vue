import './plugins';
import './assets/style.css';
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
Vue.use(Vuelidate);
Vue.use(Notifications);
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import router from "./router";
import store from "./store";
import i18n from './plugins/i18n'

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
});
