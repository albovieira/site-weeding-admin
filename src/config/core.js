import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import VueClipboard from 'vue-clipboard2';

export default {
  inject: () => {
    Vue.use(BootstrapVue);
    Vue.component('icon', Icon);
    Vue.use(VueClipboard);
    Vue.config.productionTip = false;
  }
};
