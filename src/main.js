import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Vuex from 'vuex'


export const eventBus = new Vue();
Vue.config.productionTip = false
Vue.use(Autocomplete)
Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

