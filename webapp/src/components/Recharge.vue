<template>
  <div>

    <p>{{ $t('Account balance') }}: {{$store.getters.getBalance}} {{ $t($store.getters.getCurrency) }} </p>

    <form class="form">
      <div class="input-group"  :title="$t('Net Amount')">
        <span class="input-group-addon" id="amount-addon1"> <i class="fa fa-euro fa-fw" aria-hidden="true"></i> </span>
        <input name="amount" class="form-control" v-model="amount" aria-describedby="amount-addon1" type="number" min="1" step=1 :placeholder="$t('Net Amount')" :value="amount" />
      </div>
      <div class="input-group" :title="$t('Card Number')">
        <span class="input-group-addon" id="cardNo-addon1"> <i class="fa fa-credit-card fa-fw" aria-hidden="true"></i> </span>
        <input name="cardNo" class="form-control" v-model="cardNo" aria-describedby="cardNo-addon1" type="number" min="1" step=1 :placeholder="$t('Card Number')" :value="cardNo" />
      </div>
      <div class="input-group" :title="$t('CVV Code')">
        <span class="input-group-addon" id="CVV-addon1"> <i class="fa fa-key fa-fw" aria-hidden="true"></i> </span>
        <input name="CVV" class="form-control" v-model="CVV" aria-describedby="CVV-addon1" type="number" min="1" step=1 :placeholder="$t('CVV Code')" :value="CVV" />
      </div>
      <div class="input-group" :title="$t('Expiration Date')">
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
      <div class="input-group" :title="$t('Charged Amount')">
        <span class="input-group-addon" id="ChargedAmount-addon1"> <i class="fa fa-money fa-fw" aria-hidden="true"></i> </span>
        <input name="ChargedAmount" class="form-control" v-model="totalAmountCharged" disabled aria-describedby="ChargedAmount-addon1" type="number" min="1" step=1 placeholder="$t('Charged Ammount')" :value="totalAmountCharged" />
      </div>
      <button class="btn btn-primary btn-block recharge-btn" type="button" @click="registerCardAndRecharge">{{$t('Refill')}}</button>
    </form>

    <img class="powered-by-mangopay-img" src="powered-by-mangopay.png" alt="Powered by Mangopay">

    <hr>

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

import axios from 'axios'

// const http = axios.create({
//   headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
// })

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
      secureUrl: '#'
    }
  },
  computed: {
    totalAmountCharged () {
      return (parseFloat(this.amount) + parseFloat(this.amount) * 0.018 + 0.18).toFixed(2)
    }
  },
  methods: {
    registerCard () {
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
      console.log('Calling: ' + urls.API_URL.CurrentUrl + urls.REGISTER_CARD_URL)
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
      // resp.data.accessKeyRef, resp.data.cardRegistrationURL, resp.data.data
      this.sendToMangopay(data.accessKeyRef, data.cardRegistrationURL, data.data, this.cardNo, this.expirationDate, this.CVV, this.rechargeAccount)
    },
    sendToMangopay (accessKeyRef, cardRegistrationURL, data, cardNo, expirationDate, CVV, rechargeAccountCallBack) {
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

      // this.$http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user_token')
      // delete this.$http.headers.common['Authorization']
      // console.log('headers:')
      // console.log(this.$http.headers)
      // 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      // var options = {
      //     data:         mangopayData,
      //     emulateJSON:  mangoParameters,
      //     headers:      { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8' }
      // }
      // this.$http.post(cardRegistrationURL, mangopayData, options).then(resp => {
      //     rechargeAccountCallBack(resp.data)
      //   }, err => {
      //     vm.$store.commit('setLoading', false)
      //   })

      console.log('mangopayData')
      console.log(mangopayData)
      console.log(encodeURIComponent(mangoParameters))

      console.log('Calling ' + cardRegistrationURL + mangoParameters)

      var instance = axios.create({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      })
      instance.post(cardRegistrationURL + '?' + mangoParameters, mangopayData).then(resp => {
        console.log('sendToMangopay response')
        console.log(JSON.stringify(resp))
        rechargeAccountCallBack(resp.data)
      }).catch(err => {
        console.log('sendToMangopay error')
        console.log(JSON.stringify(err))
        vm.$store.commit('setLoading', false)
        vm.$store.commit('setError', 'Error occured while waiting for the payments service')
        console.log(err)
      })
    },
    rechargeAccount (token) {
      token = '' + token
      var vm = this

      var rechargeData = { amount: parseFloat(this.amount) * 100, token: token }

      let url = urls.API_URL.CurrentUrl + urls.RECHARGE_ACCOUNT_URL
      console.log('Calling: ' + url)
      axios({
        method: 'post',
        url: url,
        data: rechargeData,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        // check for response code
        // if code is 200, it means normal recharge if the code is 301 it means the payment is 3DS, which returns the
        console.log(resp)
        console.log('status = ', resp.status)
        console.log('is 3DS = ', resp.data.transtion_type === '3DS')
        console.log(resp.data)
        console.log('resp.data.transtion_type = ' + resp.data.transtion_type)
        if (resp.data.transtion_type === '3DS') {
          console.log('initiating 3DS transaction')
          var link = resp.data.verification_url
          if (link.length < 5) {
            console.log('link is too short')
            vm.$store.commit('setError', 'Sorry, no 3DS link to complete the transaction')
            return
          }
          console.log('setting last balance')
          localStorage.setItem('lastBalance', this.$store.getters.getBalance)
          console.log('link = ' + link)
          vm.secureUrl = link
          console.log('secureUrl = ' + vm.secureUrl)
          // vm.$store.commit('setShowGoTo', true)
          vm.$events.emit('showGoToModalEvent', {
            url: link,
            message: 'You are redirected to complete the 3DS secure transaction. If you want the transaction to complete continue to the following page and come back when done',
            title: '3DS Transaction',
            buttonText: 'Continue'
          })
          // var win = window.open(resp.data.verification_url)
          // if (window.focus) {
          //   win.focus()
          // }
          vm.$store.commit('setLoading', false)
          vm.$events.$emit('acountUpdate', {})
          vm.$store.commit('setSuccess', 'Started secure transaction please complete process in the new window after you click continue')
          return
        }
        vm.$store.commit('setLoading', false)
        vm.$events.$emit('acountUpdate', {})
        vm.$store.commit('setSuccess', 'Recharge successful')
      }).catch(err => {
        console.log('Recharge request error')
        console.log(JSON.stringify(err))
        if (err === undefined) {
          return
        }
        if (err.error) {
          vm.$store.commit('setError', err.error)
        } else if (err.errors !== undefined) {
          vm.$store.commit('setErrors', err.errors)
        } else if (err.data.errors !== undefined) {
          vm.$store.commit('setErrors', err.data.errors)
        } else if (err.data.error !== undefined) {
          vm.$store.commit('setError', err.data.error)
        } else {
          vm.$store.commit('setError', err)
        }

        vm.$store.commit('setLoading', false)
      })

      // this.$http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user_token')
      //
      // this.$http.post(url, rechargeData)
      //   .then(resp => {
      //     vm.$store.commit('setLoading', false)
      //     vm.$events.$emit('acountUpdate', {})
      //     vm.$store.commit('setSuccess', 'Recharge successful')
      //   }, err => {
      //     if (err.error) {
      //       vm.$store.commit('setError', err.error)
      //     } else if (err.errors) {
      //       vm.$store.commit('setErrors', err.errors)
      //     } else if (err.data.errors) {
      //       vm.$store.commit('setErrors', err.data.errors)
      //     } else if (err.data.error) {
      //       vm.$store.commit('setError', err.data.error)
      //     } else {
      //       vm.$store.commit('setError', 'Error recharging account')
      //     }
      //
      //     vm.$store.commit('setLoading', false)
      //   })
    },

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

    registerCardAndRecharge () {
      if (!this.rechargeFormIsValid()) {
        return
      }
      this.$store.commit('setLoading', true)
      // start the process that calls other calls until the recharge is complete
      this.registerCard()
    }
  },
  components: {
    'go-to-box': GoTo
  }
}
</script>
