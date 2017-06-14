<template>
  <div class="signup-area-wrapper">

    <div class="modal-wrapper">
      <div class="modal-inner">
        <vodal :show="showTerms" :width="250" :height="300" animation="rotate" @hide="showTerms = false">
            <terms-modal :selected_country="signup.country"></terms-modal>
        </vodal>
      </div>
    </div>

    <h1>{{$t('Sign up')}}</h1>
    <div class="share-button">
      <button class="btn btn-success btn-xs pull-right" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
    </div>

    <form class="form">

      <h5>{{$t('Personal Info')}}</h5>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('First name')" id="fname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.first_name" aria-describedby="fname-addon1" type="text" :placeholder="$t('First name')" :value="signup.first_name" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Last name')" id="lname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
        <input name="last_name" class="form-control" v-model="signup.last_name" aria-describedby="lname-addon1" type="text" :placeholder="$t('Last name')" :value="signup.last_name" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Birthday')" id="birthday-addon1"> <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> </span>
        <input name="birthday" class="form-control" v-model="signup.birthday" aria-describedby="birthday-addon1" type="date" :placeholder="$t('Birthday')" :value="signup.birthday" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Gender')" id="gender-addon1"> <i class="fa fa-venus-mars fa-fw" aria-hidden="true"></i> </span>
        <div class="form-control" aria-describedby="gender-addon1">
            <label><input type="radio" name="gender" checked value="M" v-model="signup.gender">{{$t('Male')}}</label>
            <label><input type="radio" name="gender" value="F" v-model="signup.gender">{{$t('Female')}}</label>
        </div>

      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Nationality')" id="nationality-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
        <select class="form-control" aria-describedby="nationality-addon1" v-model="signup.nationality">
          <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signup.nationality = country.code" :value="country.code">{{$t(country.name)}}</option>
        </select>

      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Country of residence')" id="country_of_residence-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
        <select class="form-control" aria-describedby="country_of_residence-addon1" v-model="signup.country_of_residence">
          <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signin.country_of_residence = country.code" :value="country.code"> {{$t(country.name)}}</option>
        </select>

      </div>


      <h5>{{$t('Establishment Info')}}</h5>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Establishment name')" id="POS_name-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.POS_name" aria-describedby="POS_name-addon1" type="text" :placeholder="$t('Establishment name')" :value="signup.POS_name" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('CIF Code')" id="cif-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.cif" aria-describedby="cif-addon1" type="text" :placeholder="$t('CIF Code')" :value="signup.cif" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Country')" id="country-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
        <select class="form-control" aria-describedby="country-addon1" v-model="signup.country">
          <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signup.country = country.code" :value="country.code">{{$t(country.name)}}</option>
        </select>
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('City')" id="city-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
        <input name="city" class="form-control" v-model="signup.city" @input="updateAddress" aria-describedby="city-addon1" type="text" :placeholder="$t('City')" :value="signup.city" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Zip Code')" id="zip_code-addon1"> <i class="fa fa-map-pin fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.zip_code"  @input="updateAddress" aria-describedby="zip_code-addon1" type="number" :placeholder="$t('Zip Code')" :value="signup.zip_code" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('address')" id="address-addon1"> <i class="fa fa-map-signs fa-fw" aria-hidden="true"></i> </span>
        <input name="first_name" class="form-control" v-model="signup.address"  @input="updateAddress" aria-describedby="address-addon1" type="text" :placeholder="$t('address')" :value="signup.address" />
      </div>



      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Email')" id="email-addon1"> <i class="fa fa-envelope fa-fw" aria-hidden="true"></i> </span>
        <input name="mail" class="form-control" v-model="signup.mail" @input="updateEmail" aria-describedby="email-addon1" type="email" :placeholder="$t('Email')" :value="signup.email" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Password')" id="password-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
        <input name="password" class="form-control" v-model="signup.password"  @input="updatePassword" aria-describedby="password-addon1" type="password" :placeholder="$t('Password')" :value="signup.password" />
      </div>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Terms and conditions')" id="terms-addon1"> <input name="accept_terms" v-model="acceptTerms" @click="toggleTermsModal" :checked="acceptTerms" type="checkbox" :value="acceptTerms" /> </span>
        <label class="form-control" for="accept_terms"  aria-describedby="terms-addon1">{{$t('Terms and conditions')}}</label>
      </div>

      {{$t('If you already have an account')}} <a class="" @click="goToLoginPOSPage" > {{$t('Login here')}}</a>

      <button class="btn btn-primary btn-block signup-btn" @click="signupUser" :disabled="!acceptTerms" > <i class="fa fa-paper-plane" aria-hidden="true"></i> {{$t('Sign up')}}</button>

    </form>

    <button class="btn btn-default btn-xs btn-block" :disabled="addressIsValid" @click="goToSignupPage">{{$t('Signup as User')}}</button>

  </div>
</template>

<style scoped>
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.6em;
}
h2{
  font-size: 1.45em;
}
h3{
  font-size: 1.3em;
}
h4 {
  font-size: 1.15em;
}
h5 {
  font-size: 1em;
}
a {
  cursor: pointer;
}
.signup-btn {
  margin-top: .5em;
}
.signup-area-wrapper {
  margin: 1em auto;
}
.input-group {
  margin-bottom: .3em;
}
.btn-xs {
  margin-top: .2em;
}
.modal-wrapper {
  position: relative;
  z-index: 1001;
}
.modal-inner {
  /* position: absolute;
  left: 10%;
  top: 80%;
  transform: translate(-50%,-50%); */
}
.share-button {
  position: absolute;
  left: 0;
  right: 1.7em;
  margin-top: 0;
}
</style>

<script>
import axios from 'axios'
import * as urls from '../api_variables'
import Terms from './Terms.vue'

export default {

  data () {
    return {
      signup: {
        first_name: '',
        last_name: '',
        status: 'POS',
        birthday: '',
        gender: '',
        nationality: 'ES',
        country_of_residence: 'ES',

        POS_name: '',
        cif: '',
        zip_code: 0,
        country: 'ES',
        address: '',
        city: 'Madrid',

        geo_x: 0,
        geo_y: 0,

        mail: '',
        password: ''
      },
      readTerms: false,
      acceptTerms: false,
      showTerms: false,
      addressIsValid: false,
      updateAddressTimer: 0
    }
  },
  computed: {

  },
  methods: {
    getLocationFromGoogle (address) {
      var vm = this
      var key = 'AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es'
      var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
      axios({
        method: 'GET',
        url: url
      }).then(resp => {
        console.log('Geocode response')
        console.log(resp)
        if (resp.data && resp.data.results.length > 0 && resp.data.results[0].geometry.location) {
          var location = resp.data.results[0].geometry.location
          console.log(location)
          vm.signup.geo_x = location.lng
          vm.signup.geo_y = location.lat
        }
      })
    },
    updateAddress () {
      clearTimeout(this.updateAddressTimer)
      this.updateAddressTimer = setTimeout(() => {
        var address = (this.signup.address + ', ' + this.signup.zip_code + ' ' + this.signup.city).replace(' ', '+')
        console.log('updateAddress: ' + address)
        this.getLocationFromGoogle(address)
      }, 1000)
    },
    toggleTermsModal (e) {
      e.preventDefault()
      this.showTerms = !this.showTerms
    },
    goToSignupPage (e) {
      e.preventDefault()
      // this.$store.commit('setCurrentPage', 'signup')
      this.$events.emit('goToPageEvent', 'signup')
      this.$store.commit('resetMessages')
    },
    goToLoginPOSPage (e) {
      e.preventDefault()
      this.$store.commit('setLoginAsUser', false)
      // this.$store.commit('setCurrentPage', 'login')
      this.$events.emit('goToPageEvent', 'login')
      this.$store.commit('resetMessages')
    },
    updateNationality (e) {
      e.preventDefault()
      console.log(e.log)
      this.signup.nationality = e.code
    },
    updateEmail (e) {
      e.preventDefault()
      this.$store.commit('updateEmail', this.signup.mail)
    },
    updatePassword (e) {
      e.preventDefault()
      this.$store.commit('updatePassword', this.signup.password)
    },
    setMessage (response) {
      if (!response) {
        return
      }
      console.log('setting repsonse message')
      console.log(response)
      if (response.errors) {
        this.$store.commit('setErrors', response.errors)
      } else if (response.warning) {
        this.$store.commit('setWarning', response.warning)
      } else if (response.info) {
        this.$store.commit('setInfo', response.info)
      } else if (response.success) {
        this.$store.commit('setSuccess', response.success)
      }

      this.$store.commit('setLoading', false)
    },
    setUserToken (token) {
      console.log('setting token:')
      this.$store.commit('setToken', token)
      console.log('setting current_state')
      this.$store.commit('setCurrentState', 'loggedin')
    },
    signupUser (e) {
      e.preventDefault()
      var vm = this
      this.$store.commit('setLoading', true)
      var creds = this.signup
      console.log(creds)
      // to solve the API date parsing problem I've to append this
      creds.birthday += 'T15:04:05+00:00'
      console.log(creds.birthday)
      // to solve "json: cannot unmarshal string into Go struct field SignupRequest.zip_code of type int"
      creds.zip_code = parseInt(creds.zip_code)
      // var setMyToken = this.setUserToken
      var setReponseMessage = this.setMessage
      var goToLoginPOSPage = () => {
        vm.$store.commit('setLoginAsUser', 'loginPOS')
        vm.$events.emit('goToPageEvent', 'login')
        vm.$store.commit('setCurrentState', 'login')
        vm.$store.commit('resetMessages')
      }
      this.$store.commit('resetMessages')

      let url = urls.API_URL.CurrentUrl + urls.SIGNUP_URL
      this.$http.post(url, creds)
        .then((resp) => {
          // return the success code
          var data = {}
          console.log(resp)
          if (resp.status === 200) {
            if (resp.data) {
              data = resp.data
              if (data.message) {
                vm.setMessage({'success': 'Signed up successfully!'})
                goToLoginPOSPage()
              }
            }
          }
        }, (err) => {
          setReponseMessage(err.data)

          console.log('Error')
          console.log(err)
        })
    }
  },
  components: {
    'terms-modal': Terms
  }

}
</script>
