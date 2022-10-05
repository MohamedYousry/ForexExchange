import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import CurrencySymbol from 'vue-currency-symbol/dist/vue-currency-symbol.esm.js'
import './interceptors/main.interceptor';
  Vue.config.productionTip = false
Vue.use(CurrencySymbol);
 
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');


