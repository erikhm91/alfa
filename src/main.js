import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
import './styles/global.scss'

new Vue({
  render: h => h(App),
}).$mount('#app')
