<template>
  <div class="">
    <div v-if="ready" class="">
        <button v-if="authorized" @click="logout()" class="btn btn-danger"> <i class="fa fa-facebook fa-fw"></i> {{$t('Logout from facebook')}}</button>
        <button v-else="authorized" @click="login()" class="btn btn-primary"> <i class="fa fa-facebook fa-fw"></i> {{$t('Login from facebook')}}</button>

        <div v-if="authorized" class="">

        </div>
      </div>
  </div>
</template>

<style scoped>
html, body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #EDF7FF;
  text-align: center;
  padding: 30px;
}
.box {
  background-color: #B6E3F6;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 5px;
}
</style>

<script>
export default {

  data () {
    return {
      profile: {},
      ready: false,
      authorized: false
    }
  },
  mounted () {
    console.log('FACEBOOK LOGIN mounted')
    let vm = this
    var FBAPPID = ''
    var domainName = window.location.hostname
    switch (domainName) {
      case 'web.jevaisaider.org':
        console.log('using jva id')
        FBAPPID = ''
        break
      case 'web.microhuchasolidaria.org':
        console.log('using mhs id')
        FBAPPID = '219601041795109'
        break
      default:
        console.log('using default id')
        FBAPPID = '219601041795109'
    }
    window.fbAsyncInit = () => {
      console.log('FACEBOOK LOGIN fbAsyncInit')
      /*eslint-disable */
      window.FB.init({
        appId: FBAPPID,
        cookie: true,
        xfbml: true,
        version: 'v2.9'
      })
      window.FB.getLoginStatus(function (response) {
        console.log('FACEBOOK LOGIN getLoginStatus')
        console.log(response)
        vm.statusChangeCallback(response)
      })
      /*eslint-enable */
    }
    setTimeout(function () {
      window.fbAsyncInit()
    }, 1000)
  },
  beforeCreate () {
    console.log('FACEBOOK LOGIN beforeCreate')
  },
  methods: {
    getProfile () {
      console.log('FACEBOOK LOGIN getProfile()')
      /*eslint-disable */
      let vm = this
      window.FB.api('/me', function (response) {
        console.log('getProfile response')
        console.log(response)
        // vm.$set(vm, 'profile', response)
        vm.$store.commit('setFBProfile', response)
      })
      /*eslint-enable */
    },
    login () {
      console.log('FACEBOOK LOGIN login()')
      let vm = this
      /*eslint-disable */
      FB.login(function (response) {
        console.log('login response')
        console.log(response)
        vm.statusChangeCallback(response)
      }, {scope: 'publish_actions'})
      /*eslint-enable */
    },
    logout () {
      console.log('FACEBOOK LOGIN logout()')
      let vm = this
      /*eslint-disable */
      FB.logout(function (response) {
        console.log('logout response')
        console.log(response)
        vm.statusChangeCallback(response)
        vm.$events.emit('logoutEvent')
      })
      /*eslint-enable */
    },
    statusChangeCallback (response) {
      console.log('FACEBOOK LOGIN statusChangeCallback')
      let vm = this
      vm.ready = true
      console.log('statusChangeCallback')
      console.log(response)
      if (response.status === 'connected') {
        console.log('authResponse')
        console.log(response.authResponse)
        vm.$events.emit('socialLoginEvent', {
          type: 'facebook',
          token: response.authResponse.accessToken
        })
        vm.$store.commit('setFBAuthorized', true)
        vm.authorized = true
        vm.getProfile()
      } else if (response.status === 'not_authorized') {
        vm.authorized = false
        vm.$store.commit('setFBAuthorized', false)
      } else {
        vm.authorized = false
        vm.$store.commit('setFBAuthorized', false)
        localStorage.removeItem('socialLoginToken')
      }
    }
  }

}
</script>
