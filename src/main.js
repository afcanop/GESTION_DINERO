import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyBHpXvcKEEqiprMv4ZwGWU8JnWFRmjePjg",
  authDomain: "react-35a13.firebaseapp.com",
  databaseURL: "https://react-35a13.firebaseio.com",
  projectId: "react-35a13",
  storageBucket: "react-35a13.appspot.com",
  messagingSenderId: "762337309419"
};
firebase.initializeApp(config);

new Vue({
  render: h => h(App)
}).$mount('#app')
