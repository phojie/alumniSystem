import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyCF5-uRTXz-ri-tsdTLS8t9G-4sE9P_uw8",
  authDomain: "alumnisystem-1a0cf.firebaseapp.com",
  databaseURL: "https://alumnisystem-1a0cf.firebaseio.com",
  projectId: "alumnisystem-1a0cf",
  storageBucket: "alumnisystem-1a0cf.appspot.com",
  messagingSenderId: "242517042814"
}
firebase.initializeApp(config);

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
