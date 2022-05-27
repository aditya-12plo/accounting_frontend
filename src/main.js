import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Axios from 'axios';
import vueJquery from 'vue-jquery';
import VueEvents from 'vue-events';
import accounting from 'accounting';
import VueToast from 'vue-toast-notification';
import VueGoodTablePlugin from 'vue-good-table';
import moment from 'moment';
import money from 'v-money';
import VModal from 'vue-js-modal';
import router from "./routes";
import store from "./store";
import messages from "@/middleware/i18n";
import VueI18n from "vue-i18n";
import terbilang from "terbilang-js";
import {onRandom,onBehind} from "@/middleware/hadish";
import settings from '@/middleware/app';
import addFunction from '@/middleware/addFunction';
import {getAuthToken,getUserInfo,logoutUser,setAuthToken,setAuthLang} from '@/middleware/auth';


moment.locale('id');

require('es6-promise').polyfill();
Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(VueToast);
Vue.use(vueJquery);
Vue.use(VueEvents);
Vue.use(VueGoodTablePlugin);
Vue.use(money, {precision: 4});
Vue.use(VModal);
Vue.use(VueI18n);
Vue.use(terbilang);

// global variable
Vue.prototype.$http             = Axios;
Vue.prototype.$accounting       = accounting;
Vue.prototype.$moment           = moment;
Vue.prototype.$settings         = settings;
// Vue.prototype.$i18n = i18n;
Vue.prototype.$addFunction      = addFunction;
Vue.prototype.$getAuthToken     = getAuthToken;
Vue.prototype.$getUserInfo      = getUserInfo;
Vue.prototype.$logoutUser       = logoutUser;
Vue.prototype.$setAuthToken     = setAuthToken;
Vue.prototype.$setAuthLang      = setAuthLang;
Vue.prototype.$onRandom         = onRandom;
Vue.prototype.$onBehind         = onBehind;


const token = getAuthToken();
if (token) {
  setAuthToken(token);
}


const lang    = localStorage.Lang;

if (localStorage.getItem("Lang") === null) {
  localStorage.Lang   = "id";
  localStorage.setItem('Lang', "id")
  this.lang           = "id";
  setAuthLang("id");
}


const i18n = new VueI18n({
    locale: lang,
    fallbackLocale: 'en',
    localeDir: 'locales',
    enableInSFC: true,
    messages,
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
