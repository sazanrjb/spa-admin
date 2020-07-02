import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify';
import store from "@/plugins/vuex";
import router from '@/plugins/vue-router';
import VueToasted from 'vue-toasted';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false
Vue.use(VueToasted);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
