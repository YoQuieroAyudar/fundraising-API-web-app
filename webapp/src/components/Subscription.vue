<template>
  <div>

    <form class="form">
      <p style="margin:.3em;">{{ $t('Your subscription ends in {days} day ::: Your subscription ends in {days} days', {days: getSubscriptionEnd}, getSubscriptionEnd) }}</p>

      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Duration')" id="months-addon1"> {{$t('Duration')}}</span>
        <select class="form-control" aria-describedby="nationality-addon1" @change="calculateFees" v-model="months">
          <option selected :value="1">{{$t('1 month')}}</option>
          <option :value="3">{{$t('3 month')}}</option>
          <option :value="6">{{$t('6 month')}}</option>
          <option :value="12">{{$t('12 month')}}</option>
        </select>
      </div>
      <div dir="ltr" class="input-group" :title="$t('Card Number')">
        <span class="input-group-addon" id="cardNo-addon1"> <i class="fa fa-credit-card fa-fw" aria-hidden="true"></i> </span>
        <input name="cardNo" class="form-control" v-model="cardNo" aria-describedby="cardNo-addon1" type="number" min="1" step=1 :placeholder="$t('Card Number')" :value="cardNo" />
      </div>
      <div dir="ltr" class="input-group" :title="$t('CVV Code')">
        <span class="input-group-addon" id="CVV-addon1"> <i class="fa fa-key fa-fw" aria-hidden="true"></i> </span>
        <input name="CVV" class="form-control" v-model="CVV" aria-describedby="CVV-addon1" type="number" min="1" step=1 :placeholder="$t('CVV Code')" :value="CVV" />
      </div>
      <div dir="ltr" class="input-group" :title="$t('Expiration Date')">
        <span class="input-group-addon" id="expirationDate-addon1"> <i class="fa fa-calendar-times-o fa-fw" aria-hidden="true"></i> </span>
        <div class="">
          <div class="month-input">
            <input name="expirationDateMonth" class="form-control" v-model="expirationDate.month" aria-describedby="expirationDate-addon1" type="number" min="1" max="12" step=1 :placeholder="$t('MM')" :value="expirationDate.month" />
          </div>
          <div class="year-input">
            <input name="expirationDateYear" class="form-control" v-model="expirationDate.year" width=3 aria-describedby="expirationDate-addon1" type="number" min="1" step=1 :placeholder="$t('YY')" :value="expirationDate.year" />
          </div>
        </div>
      </div>
      <div dir="ltr"class="input-group" :title="$t('TAX %')">
        <span class="input-group-addon" id="TAX-addon1"> {{$t('TAX')}} {{taxRate}}%</span>
        <input name="tax" class="form-control" v-model="tax" disabled aria-describedby="TAX-addon1" type="number" min="1" step=1 :placeholder="$t('TAX %')"/>
      </div>
      <div dir="ltr" class="input-group" :title="$t('Fee')">
        <span class="input-group-addon" id="Fee-addon1"> {{$t('Fee')}} </span>
        <input name="fee" class="form-control" v-model="fee" disabled aria-describedby="Fee-addon1" type="number" min="1" step=1 :placeholder="$t('Fee')" />
      </div>
      <div dir="ltr" class="input-group" :title="$t('Total Amount Charged')">
        <span class="input-group-addon" id="ChargedAmount-addon1"> {{$t('Total Amount Charged')}} </span>
        <input name="ChargedAmount" class="form-control" v-model="amount" disabled aria-describedby="ChargedAmount-addon1" type="number" min="1" step=1 :placeholder="$t('Total Amount Charged')" />
      </div>
      <button class="btn btn-primary btn-block recharge-btn" type="button" @click="sendSubscription" >{{$t('Pay Subscription')}}</button>
    </form>

    <img class="powered-by-mangopay-img" src="powered-by-mangopay.png" :alt="$t('Powered by Mangopay')">

  </div>
</template>

<style scoped>
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
.recharge-btn {
  margin-top: .3em;
}
.month-input .form-control, .year-input .form-control {
  width: 5em;
}
.powered-by-mangopay-img {
  width: 100%;
}
.modal-wrapper {
  position: relative;
  z-index: 1001;
}
</style>

<script>
import * as urls from '../api_variables'
import GoTo from './GoTo.vue'
import jwtDecode from 'jwt-decode'

import axios from 'axios'

export default {
  data () {
    var thisMonth = new Date().getUTCMonth()
    var thisYear = new Date().getFullYear() - 2000
    if (thisMonth < 10) {
      thisMonth = '0' + thisMonth
    }
    if (thisYear < 10) {
      thisYear = '0' + thisYear
    }

    return {
      amount: 10,
      cardNo: '',
      CVV: '',
      expirationDate: { month: thisMonth, year: thisYear },
      registerCardResponse: {},
      fee: 0,
      tax: 0,
      taxRate: 0,
      months: 1,
      remainingDays: 30,
      feesData: {},
      Establishment: {},
      secureUrl: '#',
      lastDuration: 0
    }
  },
  watch: {
    lastDuration: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      var waitingForSubscriptionSuccess = localStorage.getItem('waitingForSubscriptionSuccess')
      if (Boolean(waitingForSubscriptionSuccess) === false) {
        return
      }
      if (oldVal !== 0 && oldVal !== val) {
        // it's not the first time setting
        // and it's not the old value
        // so emit the subscription success
        var lastSubscriptionData = JSON.parse(localStorage.getItem('lastSubscriptionData'))
        if (lastSubscriptionData.end !== undefined) {
          this.$events.emit('pageChangedEvent', '/subscription/success/url-' + lastSubscriptionData.url + '/' + lastSubscriptionData.months + 'month' + '?user=' + lastSubscriptionData.user.email)
          localStorage.removeItem('lastSubscriptionData')
        }
      }
    }
  },
  computed: {
    getLastDuration () {
      this.lastDuration = this.$store.getters.getPosSubscriptionEnd
      return this.lastDuration
    },
    getSubscriptionEnd () {
      console.log('getSubscriptionEnd')
      return parseInt(this.$store.getters.getPosSubscriptionEnd)
    },
    feesValue () {
      let fee = this.feesData.fee
      if (fee === undefined) {
        fee = 0.001
      }
      return (parseFloat(fee) / 100).toFixed(2)
    },
    totalAmountCharged () {
      var amount = this.months * 10 * 100
      if (this.feesData.vat_rate === undefined) {
        this.feesData.vat_rate = 21 / 100
      }
      var taxRate = (this.feesData.vat_rate)
      var total = amount + amount * taxRate
      // return this.calculateFees() / 100
      return total / 100
    }
  },
  methods: {
    rechargeFormIsValid () {
      var isValid = true
      // if (this.amount > parseFloat(this.$store.getters.getBalance)) {
      //   this.$store.commit('setError', 'Amount you want to recharge is greater than your balance')
      // }
      if (this.cardNo.length < 16) {
        this.$store.commit('setError', 'The card number is too short')
        isValid = false
      }
      var thisYear = new Date().getFullYear()
      var y = thisYear - 2000
      if (this.expirationDate.month < 1 && this.expirationDate.month > 12 || this.expirationDate.year < y) {
        this.$store.commit('setError', 'The expiration date is either invalid or already expired')
        isValid = false
      }

      return isValid
    },
    sendSubscription () {
      // this starts a chain of processes that call one another.
      console.log('sendSubscription')
      this.registerCard()
    },
    registerCard () {
      console.log('registerCard')
      if (!this.rechargeFormIsValid()) {
        return
      }
      var vm = this

      // this.$http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user_token')
      var authorizationHeader = 'Bearer ' + localStorage.getItem('user_token')
      var options = {
        url: urls.API_URL.CurrentUrl + urls.REGISTER_CARD_URL,
        method: 'POST',
        headers: { 'Authorization': authorizationHeader }
      }
      this.$http(options).then(resp => {
        if (resp.data) {
          vm.$store.commit('setRegCardResponse', resp.data)
          // vm.$store.commit('setSuccess', 'Register card successful')
          // make the registerCard call with the response data
          vm.callToMangoPayToGetToken(resp.data)
        } else {
          if (resp.error) {
            vm.$store.commit('setError', {error: resp.error})
          } else {
            vm.$store.commit('setError', {error: 'Not data in resp'})
          }
        }
      }, err => {
        if (!err.data) {
          vm.$store.commit('setError', {error: 'Card registeration error'})
          return
        }
        if (err.data.errors) {
          vm.$store.commit('setErrors', err.data.errors)
        }
        vm.$store.commit('setLoading', false)
      })
    },
    callToMangoPayToGetToken (data) {
      console.log('callToMangoPayToGetToken')
      // resp.data.accessKeyRef, resp.data.cardRegistrationURL, resp.data.data
      this.sendToMangopay(data.accessKeyRef, data.cardRegistrationURL, data.data, this.cardNo, this.expirationDate, this.CVV, this.paySubscription)
    },
    paySubscription (months, data) {
      console.log('paySubscription')
      console.log(months)
      console.log(data)
      var vm = this

      axios({
        method: 'POST',
        url: urls.API_URL.CurrentUrl + '/pay_subscription',
        data: {months: months, token: data},
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        console.log('paySubscription response')
        console.log(resp)
        console.log('status = ', resp.status)
        console.log(resp.data)
        if (resp.data && resp.data.transtion_type === '3DS') {
          if (resp.data.verification_url === '') {
            vm.$store.commit('setError', 'Sorry, no 3DS link to complete the transaction')
            vm.$store.commit('setLoading', false)
            return
          }
          localStorage.setItem('lastSubscriptionDays', this.$store.getters.getBalance)
          var decoded = jwtDecode(localStorage.getItem('user_token'))
          localStorage.setItem('lastSubscriptionData', JSON.stringify({end: this.$store.getters.getSubscriptionEnd, months: this.months, url: document.location.hostname, user: decoded}))
          // vm.secureUrl = resp.data.verification_url
          vm.$events.emit('showGoToModalEvent', {
            url: resp.data.verification_url,
            message: 'You are redirected to complete the 3DS secure transaction. If you want the transaction to complete continue to the following page and come back when done',
            title: '3DS Transaction',
            buttonText: 'Continue'
          })

          // TODO: setup queue stack that saves pending transactions.
          // 1. save the amount, date and url of the transaction and the current Subscription duration
          var est = this.getEstablishment()
          var dt = new Date()
          var transactionData = {
            amount: this.amount,
            months: this.months,
            Establishment: est,
            date: dt,
            redirectUrl: this.secureUrl
          }

          console.log('transactionData')
          console.log(transactionData)

          localStorage.setItem('waitingForSubscriptionSuccess', true)

          vm.$store.commit('setLoading', false)
          vm.$store.commit('setSuccess', 'Started secure transaction please complete process in the new window after you click continue')
          return
        }
        vm.$store.commit('setLoading', false)
        vm.$store.commit('setSuccess', 'Subscription successful')
      }).catch(err => {
        console.log('paySubscription error')
        console.log(err)
        vm.$store.commit('setError', 'Sorry transaction failed')
      })
    },
    sendToMangopay (accessKeyRef, cardRegistrationURL, data, cardNo, expirationDate, CVV, paySubscriptionCallback) {
      console.log('sendToMangopay')
      var mangopayData = {
        data: data,
        accessKeyRef: accessKeyRef,
        cardNumber: cardNo,
        cardExpirationDate: expirationDate.month + expirationDate.year, // MMYY
        cardCvx: CVV
      }
      var mangoParameters = ''
      for (var key in mangopayData) {
        mangoParameters += (mangoParameters.length > 0 ? '&' : '') + key + '=' + encodeURIComponent(mangopayData[key])
      }

      var vm = this
      var instance = axios.create({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      instance.post(cardRegistrationURL + '?' + mangoParameters, mangopayData).then(resp => {
        console.log('sendToMangopay response')
        console.log(JSON.stringify(resp))
        paySubscriptionCallback(vm.months, resp.data)
      }).catch(err => {
        vm.$store.commit('setLoading', false)
        vm.$store.commit('setError', 'Error occured while waiting for the payments service')
        console.log(err)
      })
    },
    getEstablishment () {
      this.Establishment = this.$store.getters.getEstablishment
    },
    calculateFees () {
      console.log('calculateFees:')
      var amount = 10 * this.months * 100
      // call get fees from API
      var currentUser = JSON.parse(localStorage.getItem('user_data'))
      var countryOfResidence = currentUser.country_of_residence
      if (countryOfResidence === undefined) {
        countryOfResidence = 'ES'
      }
      countryOfResidence = countryOfResidence.toUpperCase()
      this.getFees(amount, countryOfResidence)
    },
    getFees (amount, country) {
      console.log('getFees: amount = ' + amount + ' country = ' + country)
      var vm = this
      // get fee from API
      axios({
        method: 'POST',
        url: urls.API_URL.CurrentUrl + '/fees',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') },
        data: {
          amount: amount,
          country: country
        }
      }).then(resp => {
        console.log('fee response')
        console.log(resp.data)

        vm.feesData = resp.data
        vm.fee = parseFloat(vm.feesData.fees) / 100
        vm.tax = parseFloat(vm.feesData.vat) / 100
        vm.taxRate = parseFloat(vm.feesData.vat_rate).toFixed(2)
        vm.amount = (parseFloat(vm.feesData.total) / 100).toFixed(2)
      })
    }
  },
  beforeMount () {
    this.calculateFees()
    this.getEstablishment()
  },
  components: {
    'go-to-box': GoTo
  }
}
</script>
