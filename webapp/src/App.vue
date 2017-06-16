<template>
  <div class="">
    <div class="other">
      <div :dir='currentLangDirection' id='wrapper' v-bind:class='getWidthClass'>
        <span class='hidden'>{{currentState}}</span>
        <div class='langs btn-group btn-group-xs' role='group'>
          <button type='button' @click="setLang('en')" :class=" lang === 'en' || lang === '' ? 'btn btn-success' : 'btn btn-default'">English</button>
          <button type='button' @click="setLang('es')" :class=" lang === 'es' ? 'btn btn-success' : 'btn btn-default'">Español</button>
          <button type='button' @click="setLang('fr')" :class=" lang === 'fr' ? 'btn btn-success' : 'btn btn-default'">Français</button>
          <button type='button' @click="setLang('ar')" :class=" lang === 'ar' ? 'btn btn-success' : 'btn btn-default'">العربية</button>
          <button type='button' @click="setLang('ru')" :class=" lang === 'ru' ? 'btn btn-success' : 'btn btn-default'">русский</button>
        </div>

        <div v-if="$store.getters.getShowSlide">
          <slide-page></slide-page>
        </div>

        <div class='content' v-else>
          <div class='loading' v-if="$store.getters.getLoading">
            <h1><i class='fa fa-spinner fa-spin fa-fw'></i> {{$t('Loading')}}...</h1>
            <div class="loading-takes-long" v-if="$store.getters.getStillLoading">
              {{$t('Loading is taking longer than normal')}}
              <a class="" type="button" @click="$store.commit('setLoading', false);$events.emit('goToPageEvent', '')" name="button">Go home</a>
            </div>
          </div>

          <div v-else >
            <message-items></message-items>

            <div class="modal-wrapper">
              <div class="modal-inner">
                <vodal :show="$store.getters.getShowGoTo" :width="250" :height="300" animation="rotate" @hide="$store.commit('setShowGoTo', false)">
                    <go-to-box :title="goToModalData.title" :message="goToModalData.message" :targetUrl="goToModalData.url"></go-to-box>
                </vodal>
              </div>
            </div>

            <div class="modal-wrapper">
              <div class="modal-inner">
                <vodal :show="$store.getters.getShowShare" :width="250" :height="300" animation="rotate" @hide="$store.commit('setShowShare', false)">
                    <share-page></share-page>
                </vodal>
              </div>
            </div>

            <div class='top-container'  v-if="($store.getters.getCurrentPage != 'login' && $store.getters.getCurrentPage != '' && $store.getters.getCurrentState != '' && $store.getters.getCurrentPage != 'signup')">
              <div class='top-menu'>

                <div class='logout-area'>
                  <button :style="langDirection == 'rtl' ? 'float:right' : 'float:left'" class='btn btn-plain btn-back' @click='goToPrevPage'>
                    <i v-if="langDirection == 'rtl'" class='fa fa-angle-right fa-fw'></i>
                    <i v-else class='fa fa-angle-left fa-fw'></i>
                  </button>

                  <span class='hidden'>{{getMyBalance}}</span>
                  <div :style="langDirection == 'rtl' ? 'float:left' : 'float:right'" >
                    <logout-button></logout-button>
                  </div>
                </div>
              </div>
            </div>

            <div class=''>
              <div class='login-area' v-if="$store.getters.getCurrentState == 'login' || $store.getters.getCurrentState == ''">
                <div  v-if="$store.getters.getCurrentPage == 'login' || $store.getters.getCurrentPage == ''">
                  <login-form></login-form>
                </div>
                <div v-if="$store.getters.getCurrentPage == 'signup'">
                  <signup-form></signup-form>
                </div>
                <div v-if="$store.getters.getCurrentPage == 'signupPOS'">
                  <signup-pos-form></signup-pos-form>
                </div>
                <div v-if="$store.getters.getCurrentPage == 'share'">
                  <share-page></share-page>
                </div>

              </div>

              <div class='loggedin-area' v-else >

                <div class=''>
                  <div v-if="$store.getters.getCurrentPage == 'home' || $store.getters.getCurrentPage == ''" >
                    <home-page></home-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'share'">
                    <share-page></share-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'associations'">
                    <associations-page></associations-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'asso_details'">
                    <association-page></association-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'donations'">
                    <donations-page></donations-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'subscription'">
                    <subscription-page></subscription-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'qrCode'">
                    <qr-code-page></qr-code-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'map'">
                    <map-page></map-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'supportive-pos'">
                    <supportive-pos-page></supportive-pos-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'solidarity'">
                    <solidarity-account-page></solidarity-account-page>
                  </div>

                  <div v-if="$store.getters.getCurrentPage == 'settings'">
                    <settings-page></settings-page>
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class='bottom-menu'>
            <label :class="$store.getters.getAppMode == 'test' ? 'test-mode version': 'version'">
              <span @click="updateVNCC">Version: {{$store.getters.getVersion}}</span>
              <span style="color: #EEE">{{$store.getters.getVNCC}}</span>
              <a href="#" @click="$store.commit('setShowSlides', true); return false"><i class='fa fa-question-circle-o fa-fw'></i></a>
              <a target='_blank' :href='helpLink'>
                {{$t('Help')}}
              </a>
            </label>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import ga from 'vue-ga'
import VueRouter from 'vue-router'

const router = new VueRouter()
ga(router, 'UA-86334488-3')

import Home from './components/Home.vue'
import Logout from './components/Logout.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import SignupPOS from './components/SignupPOS.vue'
import Messages from './components/Messages.vue'
import Share from './components/Share.vue'
import Associations from './components/Associations.vue'
import Association from './components/Association.vue'
import Donations from './components/Donations.vue'
import SolidarityAccount from './components/SolidarityAccount.vue'
import Settings from './components/Settings.vue'
import Slides from './components/Slides.vue'
import Subscription from './components/Subscription'
import QRCode from './components/QRCode.vue'
import Map from './components/Map.vue'
import SupportivePOS from './components/SupportivePOS.vue'
import GoTo from './components/GoTo.vue'

import * as urls from './api_variables'
import axios from 'axios'
// var jwtToken = localStorage.getItem('user_token')

// const http = axios.create({
//   headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
// })

// // setup service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js').then(function (registration) {
//     console.log('ServiceWorker registration successful!')
//   }).catch(function (err) {
//     console.log('ServiceWorker registration failed: ', err)
//   })
// }

export default {
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  mounted () {
    /** ** ** ** ** ** *** *** IVENTS *** *** ** ** ** ** ** ** ** ** **/
    this.$events.listen('changeLanguage', eventData => {
      console.log('changeLanguage')
      var lang = String(eventData).toLowerCase()
      if (lang === null || lang === 'null') {
        return
      }
      this.setLang(lang)
      console.log('changedLanguage to: ' + lang)
      this.$events.emit('languageChanged', lang)
    })

    var langFromUrl = this.getQueryParam('lang')
    this.$events.emit('changeLanguage', langFromUrl)
    console.log('langFromUrl')
    console.log(langFromUrl)

    // check if the current domain name is one of the dbs
    var currentUrl = window.location.hostname
    console.log('You are on ' + currentUrl)
    if (currentUrl.indexOf('localhost') > -1) {
      // do nothing
      console.log('localhost')
    } else if (currentUrl.indexOf('microhuchasolidaria') > -1) {
      this.$store.commit('setAPI', 'mhs')
      console.log('microhuchasolidaria')
    } else if (currentUrl.indexOf('iwanttohelp') > -1) {
      this.$store.commit('setAPI', 'iwth')
      console.log('iwanttohelp')
    } else {
      this.$store.commit('setAPI', 'jva')
      console.log('default: jevaisaider')
    }

    var allPars = this.parseAllParams()
    console.log('allPars:')
    console.log(allPars)

    // var apiType = this.getQueryParams('db')
    if (allPars.db !== undefined && allPars.country === undefined) {
      clearTimeout(this.tOuts.changeApiTimeout)
      this.tOuts.changeApiTimeout = setTimeout(() => {
        console.log('apiType = ' + allPars.db)
        console.log('setAPIUrlLEvent')
        this.$events.emit('setAPIUrlLEvent', allPars.db)
      }, 1000)
    }
    if (allPars.country !== undefined) {
      clearTimeout(this.tOuts.selectCountryTimeout)
      this.tOuts.selectCountryTimeout = setTimeout(() => {
        console.log('setting country to ' + allPars.country)
        var countryCode = typeof allPars.country === 'string' ? allPars.country.toUpperCase() : allPars.country.toString()
        this.$store.commit('setSelectedCountry', countryCode)
        this.$store.commit('setAPI', undefined)
      }, 500)
    }

    var singupAsPOS = allPars['pos-signup'] // Boolean(this.getQueryParams('pos-signup'))
    console.log('SIGNUP POST VALUE:', singupAsPOS)
    var singupAsUser = allPars['user-signup'] // Boolean(this.getQueryParams('user-signup'))
    var loginAsPOS = allPars['pos-login'] // Boolean(this.getQueryParams('pos-login'))

    if (singupAsPOS) {
      this.goDirectlyTo('signupPOS')
    } else if (singupAsUser) {
      this.goDirectlyTo('signup')
    } else if (loginAsPOS) {
      this.goDirectlyTo('loginPOS')
    }

    this.$events.listen('testEvent', eventData => {
      console.log('testEvent')
      console.log(eventData)
    })

    // code above is from beforeMount

    this.$events.listen('getCharitiesEvent', eventData => {
      var now = new Date()
      if (this.lastChecked.associations !== null) {
        var duration = this.lastChecked.associations - now
        if (duration < 1000) {
          console.log('getCharitiesEvent was emitted before ' + duration)
          return
        }
      }
      this.lastChecked.associations = now

      console.log('getCharitiesEvent')
      // clearTimeout(this.tOuts.charityTimeout)
      // this.tOuts.charityTimeout = setTimeout(() => {
      //   this.getAssociationsFromAPI()
      // }, 1000)
      this.getAssociationsFromAPI()
    })

    this.$events.listen('setAPIUrlLEvent', eventData => {
      console.log('setAPIUrlLEvent')
      if (!eventData) {
        return
      }
      console.log('db = ' + eventData)
      if (eventData !== undefined) {
        this.$store.commit('setAPI', eventData)
        return
      }
      if (eventData && eventData.url) {
        this.$store.commit('setAPIUrl', eventData.url)
      }
    })
    this.$events.listen('showGoToModalEvent', eventData => {
      this.goToModalData = eventData
      this.$store.commit('setShowGoTo', true)
    })
    this.$events.listen('fetchEstablishmentEvent', eventData => {
      if (this.$store.getters.waitingForEstablishment) {
        console.log('already waiting for the last requested Establishment')
        return
      }
      var tOut = 1000
      if (eventData && eventData.timeOut !== undefined) {
        tOut = eventData.timeOut
      }
      this.$store.commit('setWaitingForEstablishment', true)
      console.log('fetchEstablishmentEvent')
      clearTimeout(this.tOuts.establishmentsTimeout)
      this.tOuts.establishmentsTimeout = setTimeout(() => {
        this.fetchEstablishment()
        if (eventData && eventData.loop) {
          setTimeout(() => {
            this.$events.emit('fetchEstablishmentEvent', {loop: eventData.loop, timeOut: eventData.timeOut})
          })
        }
      }, tOut)
    })
    this.$events.listen('sendLoginEvent', eventData => {
      // if (this.sentLoginEvent === false) {
      console.log('sendLoginEvent')
      this.sendLogin(eventData)
      // this.sentLoginEvent = true
      // }
    })

    this.$events.listen('sendEvent', eventData => {
      console.log('got sendEvent')
      console.log(eventData)
      // eventData = { type: 'type', action: 'action', label: '', value: '' }
      ga('send', 'event', eventData.type, eventData.action, eventData.label, eventData.value)
    })

    this.$events.listen('goToPageEvent', pageName => {
      console.log('got goToPageEvent')
      var slash = pageName.indexOf('/')
      if (slash > 0) {
        pageName = pageName.slice(0, slash)
      }
      this.$store.commit('setCurrentPage', pageName)
      this.$events.emit('pageChangedEvent', pageName)
    })

    ga(collect => {
      // when hash changes
      this.$events.listen('pageChangedEvent', (name) => {
        console.log('visitng ' + name)
        collect(name)
      })
    }, 'UA-86334488-3')

    this.$events.listen('skipSlideEvent', eventData => {
      console.log('got skipSlideEvent')
      this.$store.commit('setShowSlides', false)
    })

    this.$events.listen('logoutEvent', eventData => {
      console.log('LOGING OUT EVENT')
      this.sentLoginEvent = false
      console.log(eventData)
      this.$store.commit('logout')
      this.$store.commit('setCurrentState', 'login')
      // this.$store.commit('setCurrentPage', 'login')
      this.$events.emit('goToPageEvent', 'login')
      this.$store.commit('resetMessages')
      this.$store.commit('resetAssoList')
      localStorage.clear()
      this.$store.commit('setAPI', 'mhs')
    })

    this.$events.listen('checkDonationMeterics', eventData => {
      this.getDonationMetrics()
    })

    this.$events.listen('loginEvent', eventData => {
      // if (this.sentLoginEvent === true) {
      //   console.log('loginEvent is already in proccess')
      //   return
      // }
      console.log('LOGIN EVENT')
      console.log(eventData)
      console.log('saving user data')
      localStorage.setItem('user_data', JSON.stringify(eventData.decoded))
      var userType = (eventData.decoded.status || 'USER')
      if (userType === 'POS') {
        console.log('user type is POS')
        this.$events.emit('fetchEstablishmentEvent')
      }
      console.log('saving user token')
      localStorage.setItem('user_token', eventData.token)
      this.$store.commit('setToken', eventData.token)
      localStorage.setItem('rememberMe', eventData.rememberMe)
      console.log('setting USER TYPE: ')
      this.$store.commit('setUserType', eventData.decoded.status)
      this.$store.commit('setCurrentState', 'loggedin')
      this.$store.commit('setCurrentPage', 'home')
      this.setMessage({'success': 'Login successfully!'})
      var vm = this
      clearTimeout(this.tOuts.balanceTimout)
      this.tOuts.balanceTimout = setTimeout(() => { vm.$events.$emit('acountUpdate', {}) }, 1000)
    })

    this.$events.listen('acountUpdate', eventData => {
      console.log('acountUpdate EVENT')
      if (!this.$store.getters.getLogin) {
        console.log('not loggedin, returning')
        return
      }
      if (this.$store.getters.waitingForBalance) {
        console.log('already waiting for balance request')
        return
      }
      this.$store.commit('setWaitingForBalance', true)

      if (this.$store.getters.getUserType === 'POS') {
        return
      }
      var vm = this
      let url = urls.API_URL.CurrentUrl + urls.WALLET_BALANCE_URL
      // jwtToken = localStorage.getItem('user_token')
      axios({
        url: url,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        this.$store.commit('setWaitingForBalance', false)
        if (!resp.data) {
          console.log('no response data')
          return
        }
        console.log('response data')
        console.log(resp.data)
        if (resp.data.balance) {
          console.log('no balance data')
          // if (eventData.loop && eventData.loop !== false) {
          //   setTimeout(function () {
          //     vm.$events.$emit('acountUpdate', {loop: eventData.loop, timeOut: eventData.timeOut})
          //   }, eventData.timeOut)
          // }
          vm.$store.commit('setCurrency', resp.data.balance.Currency)
          vm.$store.commit('setBalance', resp.data.balance.Amount)
          if (localStorage.getItem('lastBalance') < resp.data.balance.Amount) {
            localStorage.setItem('lastBalance', null)
            // vm.$store.commit('setSuccess', 'Your balance increased!')
          }
        }
      }).catch(err => {
        this.$store.commit('setWaitingForBalance', false)
        console.log('axios failed')
        console.log(err.data)
        // if (eventData.loop && !vm.$store.getters.waitingForBalance) {
        //   setTimeout(function () {
        //     vm.$events.$emit('acountUpdate', {loop: eventData.loop, timeOut: eventData.timeOut})
        //   }, eventData.timeOut)
        // }
      })
    })
  },
  beforeCreate () {
    console.log('beforeCreate')

    // clear all events
    console.log('clearing all Event Listeners')
    this.$events.remove('changeLanguage')
    this.$events.remove('getCharitiesEvent')
    this.$events.remove('setAPIUrlLEvent')
    this.$events.remove('showGoToModalEvent')
    this.$events.remove('fetchEstablishmentEvent')
    this.$events.remove('setWaitingForEstablishment')
    this.$events.remove('sendLoginEvent')
    this.$events.remove('sendEvent')
    this.$events.remove('goToPageEvent')
    this.$events.remove('pageChangedEvent')
    this.$events.remove('skipSlideEvent')
    this.$events.remove('logoutEvent')
    this.$events.remove('checkDonationMeterics')
    this.$events.remove('loginEvent')
    this.$events.remove('acountUpdate')

    var vm = this
    setTimeout(() => { vm.$store.commit('resetMessages') }, 5000)

    var rememberMe = localStorage.getItem('rememberMe')

    if (rememberMe !== null) {
      // read the saved token from localStorage
      var jwtToken = localStorage.getItem('user_token')
      if (jwtToken !== null) {
        localStorage.clear()
      } else { // no token means not signed in
        this.$store.commit('setCurrentState', 'login')
        localStorage.setItem('country_code', 'ES')
        return 'login'
      }

      return this.$store.getters.getCurrentState
    }
  },
  beforeMount () {
    console.log('beforeMount')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  data () {
    return {
      langDirection: '',
      helpLink: 'https://github.com/YoQuieroAyudar/fundraising-API-web-app/wiki/Help',
      lang: 'en',
      showSlide: true,
      goToModalData: {
        url: '#link',
        title: 'Go To Page',
        message: 'Go to this page',
        buttonText: 'Continue'
      },
      showShare: false,
      tOuts: {
        charityTimeout: 0,
        balanceTimout: 0,
        establishmentsTimeout: 0,
        changeApiTimeout: 0,
        selectCountryTimeout: 0
      },
      sentLoginEvent: false,
      lastChecked: {
        balance: null,
        associations: null
      }
    }
  },
  methods: {
    goToCharityPage (id) {
      console.log('going to charity ' + id + ' page')
      var assos = this.$store.getters.getAssociations
      console.log('found ' + assos.length + ' charities')
      console.log('found ' + this.$store.getters.getCurrentAssoList.length + ' charities')
      var found = null

      for (var i = 0; i < assos.length; i++) {
        console.log('asso.id = ' + assos[i].id)
        console.log('asso.id === id ' + (parseInt(assos[i].id) === parseInt(id)))
        if (parseInt(assos[i].id) === parseInt(id)) {
          console.log('found')
          console.log(assos[i])
          found = assos[i]
        }
      }
      if (found !== null) {
        this.$store.commit('selectAssoById', found.id)
        this.$events.emit('goToPageEvent', 'asso_details/' + found.id)
      }
    },
    goDirectlyTo (pageName) {
      var vm = this
      vm.$store.commit('setLoading', true)
      vm.$store.commit('setShowSlides', false)

      // signupPOS or loginPOS set the loginAsUser to false
      var loginAsUser = !((pageName === 'signupPOS') || (pageName === 'loginPOS'))

      // there is no page named loginPOS, only login with loginAsUser set to false
      pageName = pageName === 'loginPOS' ? 'login' : pageName

      console.log('goDirectlyTo: ' + pageName + ' loginAsUser: ' + loginAsUser)

      // setTimeout(() => {
      //   vm.$store.commit('setLoginAsUser', loginAsUser)
      //   vm.$events.emit('goToPageEvent', pageName)
      //   vm.$store.commit('setLoading', false)
      // }, 500)
      vm.$store.commit('setLoginAsUser', loginAsUser)
      vm.$events.emit('goToPageEvent', pageName)
      vm.$store.commit('setLoading', false)
    },
    fetchUserEstablishments () {
      var vm = this
      axios({
        method: 'GET',
        url: urls.API_URL.CurrentUrl + '/pos',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        console.log(resp)
        console.log(resp.data.list)
        vm.$store.commit('setUserEstablishments', resp.data.list)
      })
    },
    fetchEstablishment () {
      console.log('getEstablishment')
      // continue only if the user is loggedin
      var token = localStorage.getItem('user_token')
      console.log(token)
      if (token.length < 1) {
        return
      }
      // only continue if the user is POS
      if (this.$store.getters.getLoginAsUser) {
        return
      }
      var vm = this
      axios({
        method: 'GET',
        url: urls.API_URL.CurrentUrl + '/pos',
        headers: { 'Authorization': 'Bearer ' + token }
      }).then(resp => {
        vm.$store.commit('setWaitingForEstablishment', false)
        console.log('POS response')
        console.log(resp.data)
        if (resp.data) {
          if (resp.data.list) {
            // this.Establishment = resp.data.list[0]
            if (resp.data.list.length) {
              vm.$store.commit('setEstablishment', resp.data.list[0])
            }
          }
        }
      }).catch(err => {
        vm.$store.commit('setWaitingForEstablishment', false)
        console.log('fetchEstablishment error')
        console.log(err)
      })
    },
    getQueryParam (n) {
      var half = location.search.split(n + '=')[1]
      return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null
    },
    parseAllParams () {
      var parameters = {}
      var all = location.search
      all = all.replace('?', '')
      // split all parameters
      var pv = all.split('&')
      for (var i = 0; i < pv.length; i++) {
        var keyVal = pv[i].split('=')
        parameters[keyVal[0]] = keyVal[1]
      }
      return parameters
    },
    getQueryParams (n) {
      console.log('getQueryParams')
      console.log(location.search)
      var half = location.search.split(n + '=')[1]
      console.log('half = ' + half)
      return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null
    },
    setMessage (response) {
      if (!response) {
        return
      }

      var vm = this
      setTimeout(() => { vm.$store.commit('resetMessages') }, 5000)

      if (response.errors) {
        this.$store.commit('setErrors', response.errors)
      } else if (response.error) {
        this.$store.commit('setError', response.error)
      } else if (response.warning) {
        this.$store.commit('setWarning', response.warning)
      } else if (response.info) {
        this.$store.commit('setInfo', response.info)
      } else if (response.success) {
        this.$store.commit('setSuccess', response.success)
      }

      this.$store.commit('setLoading', false)
    },
    sendLogin (loginData) {
      // var countryDb = localStorage.getItem('country_db')
      //
      // if (this.$store.getters.getAppMode !== 'test') {
      //   if (countryDb === null) {
      //     this.$store.commit('setAPI', 'mhs')
      //   } else {
      //     this.$store.commit('setAPI', countryDb)
      //   }
      // }
      this.$store.commit('setLoading', true)
      let country = localStorage.getItem('country')
      if (!country) {
        country = {name: 'Spain', db: 'mhs', code: 'ES'}
        localStorage.setItem('country', JSON.stringify(country))
      }
      var creds = loginData
      // var setMyToken = this.setUserToken
      var setReponseMessage = this.setMessage
      this.$store.commit('resetMessages')
      let url = urls.API_URL.CurrentUrl + urls.LOGIN_URL
      var vm = this
      this.$http.post(url, creds)
        .then((resp) => {
          // return the success code
          var data = {}

          if (resp.status === 200) {
            if (resp.data) {
              data = resp.data
              if (data.token) {
                var decoded = jwtDecode(data.token)
                console.log('JWT DECODED')
                console.log(decoded)
                console.log('STATUS: ' + decoded.status)
                if (vm.$store.getters.getLoginAsUser) {
                  console.log('You are loggin in as USER')
                  if (!(decoded.status === 'USER' || decoded.status === 'ADMIN')) {
                    console.log('But your current user type is ' + decoded.status)
                    setReponseMessage({'error': 'Sorry, only users are allowed to login through this form'})
                    return
                  }
                } else {
                  console.log('You are loggin in as POS')
                  if (decoded.status !== 'POS') {
                    console.log('But your current user type is ' + decoded.status)
                    setReponseMessage({'error': 'Sorry, only establishments are allowed to login through this form'})
                    return
                  }
                }

                vm.$events.$emit('loginEvent', {token: data.token, user: creds.mail, /* ss: creds.password, */ rememberMe: vm.rememberMe, 'decoded': decoded})
              }
            }
          }
        }, (err) => {
          setReponseMessage(err.data)

          console.log('Error')
          console.log(err)
        })
    },
    updateVNCC () {
      this.$store.commit('incrementVNCC')
    },
    getDonationMetrics () {
      if ((this.$store.getters.getCurrentPage !== 'home') && (this.$store.getters.getCurrentPage !== '')) {
        return
      }
      var vm = this
      let url = urls.API_URL.CurrentUrl + urls.DONATION_URL

      axios({
        url: url,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        console.log('call success')
        console.log(resp.data)
        if (resp.data) {
          if (resp.data.total_donations) {
            vm.$store.commit('setDonationTotal', resp.data)
            vm.loadingDonationMetrics = true
          }
        }
      }).catch(err => {
        console.log('call error')
        console.log(err.status + ': ' + err.statusText)
      })
      // this.$http.get(url).then(resp => {
      //   console.log('call success')
      //   console.log(resp.data)
      //   if (resp.data) {
      //     if (resp.data.total_donations) {
      //       vm.$store.commit('setDonationTotal', resp.data)
      //       vm.loadingDonationMetrics = true
      //     }
      //   }
      // }, err => {
      //   console.log('call error')
      //   console.log(err.status + ': ' + err.statusText)
      // })
    },
    setLang (lang) {
      console.log('LANGUAGE ' + lang)
      this.$i18n.set(lang)
      localStorage.setItem('user_locale', lang)
      this.langDirection = this.getLangDir()
      this.helpLink = this.setHelpUrl(lang)
      this.lang = lang
    },
    getLang () {
      return localStorage.getItem('user_locale')
    },
    // getWalletBalance () {},
    goSharePage (e) {
      e.preventDefault()
      // this.$store.commit('setCurrentPage', 'share')
      this.$events.emit('goToPageEvent', 'share')
    },
    goToPrevPage (e) {
      e.preventDefault()
      // this.$store.commit('goToPreviousPage')
      if (!(this.$store.getters.getCurrentState === 'login' || this.$store.getters.getCurrentState === '')) {
        // this.$store.commit('setCurrentPage', 'home')
        this.$events.emit('goToPageEvent', 'home')
        return
      }
      // this.$store.commit('setCurrentPage', '')
      this.$events.emit('goToPageEvent', '')
    },
    goToNextPage (e) {
      e.preventDefault()
      this.$store.commit('goToNextPage')
    },
    getLangDir () {
      var lang = localStorage.getItem('user_locale')
      console.log('lang ' + lang)
      console.log('dir ' + this.langDirection)
      if (lang !== 'ar') {
        return 'ltr'
      }
      return 'rtl'
    },
    setHelpUrl (lang) {
      var url = 'https://github.com/YoQuieroAyudar/fundraising-API-web-app/wiki/'
      if (lang === 'ar') {
        return url + 'مساعدة'
      } else if (lang === 'fr') {
        return url + 'Aide'
      } else if (lang === 'es') {
        return url + 'Ayuda'
      } else {
        return url + 'Help'
      }
    },
    getAssociationsFromAPI () {
      console.log('App.vue: getAssociationsFromAPI')
      var vm = this
      let country = localStorage.getItem('country_code')
      if (country == null) {
        console.log('no country, default is ES')
        country = 'ES'
      }
      let url = urls.API_URL.CurrentUrl + urls.ASSO_SEARCH_URL
      var data = {}
      data.POS_id = 1

      if (country !== undefined && country !== null && country !== '') {
        console.log('country = ' + country)
        url += '?country=' + country
        data.country = country
      }

      var jwtToken = localStorage.getItem('user_token')

      console.log('calling to: ' + url)

      axios({
        method: 'POST',
        url: url,
        data: data,
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      }).then(resp => {
        console.log(resp.status)
        console.log(resp.statusText)
        console.log(resp)
        if (resp.data) {
          var allParams = this.parseAllParams()
          if ('target' in allParams) {
            console.log('set target charity')
            console.log(allParams.target)

            setTimeout(function () {
              vm.goToCharityPage(allParams.target)
            }, 500)
          }
          vm.$store.commit('setAssoList', resp.data)
        } else {
          vm.$store.commit('setErrors', [{error: 'Unable to set associations list'}])
        }
      }).catch(err => {
        if (!err.data) {
          vm.$store.commit('setError', {error: 'Error while loading associations list'})
          return
        }
        if (err.data.errors) {
          vm.$store.commit('setErrors', err.data.errors)
        }
      })
    }
  },
  computed: {
    currentLangDirection () {
      return this.getLangDir()
    },
    currentState () {
      return this.$store.getters.getCurrentState
    },
    getMyBalance () {
      // var vm = this
      // setTimeout(() => {vm.getWalletBalance()}, 20000)
      return this.$store.getters.getBalance
    },
    getWidthClass () {
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width
      if (width > 479) {
        return 'desktop-max'
      }
      return 'mobile-full-page'
    },
    loggedin () {
      var token = localStorage.getItem('user_token')
      if (token) {
        this.$store.commit('setToken', token)
        this.current_state = 'loggedin'
      }
      return this.$store.getters.getLogin
    },
    isLoggedIn () {
      return this.$store.getters.getLogin
    }
  },
  destroyed () {
    localStorage.clear()
  },
  components: {
    'home-page': Home,
    'share-page': Share,
    'login-form': Login,
    'signup-form': Signup,
    'signup-pos-form': SignupPOS,
    'logout-button': Logout,
    'message-items': Messages,
    'associations-page': Associations,
    'association-page': Association,
    'donations-page': Donations,
    'solidarity-account-page': SolidarityAccount,
    'settings-page': Settings,
    'slide-page': Slides,
    'subscription-page': Subscription,
    'qr-code-page': QRCode,
    'map-page': Map,
    'supportive-pos-page': SupportivePOS,
    'go-to-box': GoTo
  }
}

</script>

<style scoped>
#wrapper {
  position: relative;
  margin: auto;
  border: 1px solid #555;
  height: 500px;
  padding: 0.5em;
  overflow: hidden;
}
.mobile-full-page {
  max-width: 100%;
}
.desktop-max {
  max-width: 300px;
}
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.45em;
}
h2{
  font-size: 1.3em;
}
h3{
  font-size: 1.15em;
}
h4 {
  font-size: 1em;
}
h5 {
  font-size: 0.95em;
}
.content {
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: .4em;
}
a {
  cursor: pointer;
}
.top-container {
  position: relative;
  box-shadow: 1px 2px 2px #CCC;
  padding: 0;
  margin: -0.3em;
  height: 2.8em;
}
.top-menu {
  position: relative;
}
.btn-plain {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: #000;
  background-color: #fff;
}
.bottom-menu {
  position: absolute;
  height: 1.5em;
  padding: .3em;
  margin: .85em;
  bottom: 0;
  left: 0;
  max-width: 290px;
  width: 92%;
}
.bottom-menu .test-mode {
  color: #FFF;
  background-color: darkgreen;
}
.bottom-menu .version {
  text-align: center;
  margin: 0;
  padding: .1em;
  width: 100%;
}
#title {
  text-align: center;
  margin: auto;
}
.page-title {
  border: 1px solid #888;
}
.langs {
  z-index: 999;
  margin-top: -1em;
  clear: both;
}
.btn-back {
  margin: .3em;
  padding: .3em;
  color: #000;
  background: #AAA;
}
.modal-wrapper {
  position: relative;
  z-index: 1001;
}
.share-button {
  position: absolute;
  left: 0;
  right: 1.7em;
  margin-top: 0;
}
</style>
