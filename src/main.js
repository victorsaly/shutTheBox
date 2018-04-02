// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// font-awesome icons
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

// animated css
import 'animate.css/animate.min.css'

// Add To Home Screen (Allow web mobile users to receive a notification to add to home screen icon)
import addToHomescreen from 'add-to-homescreen/dist/addtohomescreen.min';
import addToHomescreenCSS from 'add-to-homescreen/dist/style/addtohomescreen.css';

Vue.config.productionTip = false

// fixing bugs in mobile devices with HV calculations //https://github.com/rodneyrehm/viewport-units-buggyfill
require('viewport-units-buggyfill').init({
  // force:true,
  refreshDebounceWait: 500
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
