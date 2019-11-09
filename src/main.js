import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store'

Vue.config.productionTip = false
import './styles/app.scss';


Vue.use(VueRouter);
Vue.use(BootstrapVue);

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
