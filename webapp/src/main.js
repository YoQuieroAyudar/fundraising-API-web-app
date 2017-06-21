// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Adding Google Analytics.
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'
// import firebase from './service/firebase'
import VueResource from 'vue-resource'
import vuexI18n from 'vuex-i18n'
import VueEvents from 'vue-events'
import * as VueGoogleMaps from 'vue2-google-maps'
import SocialSharing from 'vue-social-sharing'

// make app offline-first
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()
// require('offline-plugin/runtime').install()

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es' // ,
    // v: 'OPTIONAL VERSION NUMBER',
    // libraries: 'places', //// If you need to use place input
  }
})

Vue.use(SocialSharing)

import Vodal from 'vodal'
Vue.component(Vodal.name, Vodal)
import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)

// import translations
import Spanish from '../translations/locales/es'
import French from '../translations/locales/fr'
import Arabic from '../translations/locales/ar'
import Russian from '../translations/locales/ru'

require('expose-loader?$!expose-loader?jQuery!jquery')
require('bootstrap-webpack')
require('font-awesome/fonts/fontawesome-webfont.svg')
require('../static/font-awesome-8500ab3a5a.js')
import 'vodal/common.css'
import 'vodal/rotate.css'

Vue.use(vuexI18n.plugin, store)
Vue.i18n.add('es', Spanish)
Vue.i18n.add('fr', French)
Vue.i18n.add('ar', Arabic)
Vue.i18n.add('ru', Russian)

Vue.use(VueResource)
// Vue.use(Vuefire)

/*eslint-disable */
Vue.use(VueEvents)

new Vue({
  el: '#app',
  store,
  // firebase: {
  //   cat: firebase.database.ref('cat').orderByChild('created_at')
  // },
  // router,
  template: '<App/>',
  components: { App }
})
/*eslint-enable */
