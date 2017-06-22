<template>
  <div>
    <div class="user-home" v-if="$store.getters.getUserType === 'USER' || $store.getters.getUserType === 'ADMIN'">
      <div class="share-button">
        <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
      </div>

      <h4 class="page-top-title">{{$t('hi')}}, {{getUsername}}</h4>

      <p>
        {{$t('Thanks for your generous heart. You are changing the world for a lot of people who lost hope')}}
      </p>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Country')" id="country-addon1"> {{$t('Donation Destination')}}</span>
        <select class="form-control" aria-describedby="nationality-addon1" @change="updateCountry" v-model="country" >
          <option v-for="(ctry, i) in getApiCountries" :selected="i === 0" :value="ctry">{{ctry.name}}</option>
        </select>
      </div>

      <div class="btn-group btn-group-vertical btn-block" role="group" aria-label="home-menu-items">
        <button class="btn btn-default active">{{ $t('Home') }}</button>
        <button class="btn btn-default" @click="goToAssociations">{{ $t('Charities') }}</button>
        <button class="btn btn-default" @click="goToDonations" >{{ $t('My Donations') }}</button>
        <!-- <button class="btn btn-default" @click="goToTranactions" >{{ $t('Transactions') }}</button> -->
        <button class="btn btn-default" @click="goToSolidarityAccount"> {{ $t('Solidarity Account') }} </button>
        <button class="btn btn-default" @click="gotToSupportivePOSMap" >{{ $t('Supportive Establishments') }}</button>
      </div>
      <p v-if="$store.getters.getBalance">
        {{ $t('Total Donations') }}: <span class="">{{$store.getters.getBalance}} &euro;</span>
      </p>
      <p v-else>
        <i class="fa fa-spinner fa-spin fa-fw"></i>
      </p>
    </div>
    <div class="pos-home" v-else-if="$store.getters.getUserType === 'POS'">
      <div class="share-button">
        <button class="btn btn-success btn-xs pull-right" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
      </div>
      <h4 class="page-top-title">{{$t('hi')}}, {{getUsername}}</h4>

      <p>
        {{$t('Thanks for your generous heart. You are changing the world for a lot of people who lost hope')}}
      </p>

      <div class="btn-group btn-group-vertical btn-block" role="group" aria-label="home-menu-items">
        <button class="btn btn-default active">{{ $t('Home') }}</button>
        <button class="btn btn-default" @click="goToAssociations">{{ $t('Charities') }}</button>
        <button class="btn btn-default" @click="gotToSubscription" >{{ $t('Subscription') }}</button>
        <!-- <button class="btn btn-default" @click="goToTranactions" >{{ $t('Transactions') }}</button> -->
        <button class="btn btn-default" @click="gotToQRCode" >{{ $t('My QR Code') }}</button>
        <button class="btn btn-default" @click="gotToMap" >{{ $t('Map') }}</button>
      </div>

    </div>
    <div class="" v-else>
      <p>Sorry! this page don't support your user type</p>
      <p>Type: {{$store.getters.getUserType}}</p>
    </div>
  </div>
</template>

<script>

export default {
  beforeMount () {
  },
  mounted () {
    console.log('mounted')
    this.$events.emit('getCharitiesEvent')
    this.$events.emit('fetchUserEstablishmentsEvent')
  },
  data () {
    return {
      loadingDonationMetrics: false,
      country: null
    }
  },
  methods: {
    updateCountry () {
      if (this.country !== null && this.country !== undefined && this.country.code !== undefined) {
        localStorage.setItem('country', JSON.stringify(this.country))
        localStorage.setItem('country_code', this.country.code)
        localStorage.setItem('country_db', this.country.db)
        this.$store.commit('setSelectedCountry', this.country.code)
        this.$events.emit('getCharitiesEvent')
      }
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
    goToTranactions (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'transactions')
      this.$store.commit('resetMessages')
    },
    gotToMap (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'map')
      this.$store.commit('resetMessages')
    },
    gotToSupportivePOSMap (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'supportive-pos')
      this.$store.commit('resetMessages')
    },
    gotToQRCode (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'qrCode')
      this.$store.commit('resetMessages')
    },
    goToAssociations (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'associations')
      this.$store.commit('resetMessages')
    },
    goToDonations (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'donations')
      this.$store.commit('resetMessages')
    },
    goToSolidarityAccount (e) {
      e.preventDefault()
      this.$events.emit('goToPageEvent', 'solidarity')
      this.$store.commit('resetMessages')
    },
    gotToSubscription (e) {
      this.$events.emit('goToPageEvent', 'subscription')
      this.$store.commit('resetMessages')
    }
  },
  computed: {
    getApiCountries () {
      var vm = this
      var db = this.$store.getters.getApiDB
      console.log('getApiCountries: ' + db)
      var countries = []
      var tempList = this.$store.getters.getTopCountries
      console.log('countries length = ' + tempList.length)
      console.log(tempList)
      countries = tempList.filter(c => {
        return c.db === db
      })
      // for (var i = 0; i < tempList.length; i++) {
      //   console.log(tempList[i].db)
      //   if (tempList[i].db === db) {
      //     countries.push(tempList[i])
      //   }
      // }
      console.log('typeof countries = ' + (typeof countries))
      // console.log('instance of countries = ' + instanceof countries)
      console.log(JSON.stringify(countries[0]))
      if (this.country === null) {
        vm.country = countries[0]
        this.$store.commit('setSelectedCountry', this.country.code)
      }
      return countries
    },
    getUsername () {
      var userData = JSON.parse(localStorage.getItem('user_data'))
      return userData.first_name + ' ' + userData.last_name
    },
    gettingDonationSum () {
      return this.loadingDonationMetrics
    },
    getDonationSum () {
      // get the donation
      var vm = this
      setTimeout(() => { vm.$events.$emit('checkDonationMeterics') }, 10000)
      return this.$store.getters.getDonationsTotal
    }
  }
}
</script>
<style scoped>
h1, h2, h3, h4, h5 {
  font-weight: bold
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
.share-button {
  position: absolute;
  left: 0;
  right: 1.7em;
  margin-top: 0;
}
.pull-left {
  left: 0;
  margin-left: 2em;
}
.page-top-title {
  width: 75%;
  border: 1px solid #EFE;
  padding: .1em;
}
</style>
