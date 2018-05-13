import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

Vue.filter('InputFilter', function (value) {
  return value.replace(/[/{}*<>"';]/g, '');
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
