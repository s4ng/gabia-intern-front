import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.config.productionTip = false;
Vue.use(Vuetify)

const app = '<div id="app" data-app="true"><div></div></div>'
document.body.innerHTML += app