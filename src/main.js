import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify';
import router from '@/plugins/vue-router';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
