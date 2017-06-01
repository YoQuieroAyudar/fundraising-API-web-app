<template>
  <div>

    <p>{{ $t('Your subscription will end in {days} days', remainingDays) }}</p>

    <p>You can subscribe to the service for 1 upto 6 months</p>

    <form class="form">
      <div dir="ltr" class="input-group">
        <span class="input-group-addon" :title="$t('Duration')" id="months-addon1"> {{$t('Duration')}}</span>
        <select class="form-control" aria-describedby="nationality-addon1" v-model="months">
          <option selected :value="1">{{$t('1 month')}}</option>
          <option :value="3">{{$t('3 month')}}</option>
          <option :value="6">{{$t('6 month')}}</option>
        </select>
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
      <div class="input-group" :title="$t('TAX')">
        <span class="input-group-addon" id="TAX-addon1"> <i class="fa fa-money fa-fw" aria-hidden="true"></i> </span>
        <input name="tax" class="form-control" v-model="tax" disabled aria-describedby="TAX-addon1" type="number" min="1" step=1 placeholder="$t('TAX')" :value="tax" />
      </div>
      <div class="input-group" :title="$t('Fee')">
        <span class="input-group-addon" id="Fee-addon1"> <i class="fa fa-money fa-fw" aria-hidden="true"></i> </span>
        <input name="fee" class="form-control" v-model="fee" disabled aria-describedby="Fee-addon1" type="number" min="1" step=1 placeholder="$t('Fee')" :value="fee" />
      </div>
      <div class="input-group" :title="$t('Total Amount Charged')">
        <span class="input-group-addon" id="ChargedAmount-addon1"> <i class="fa fa-money fa-fw" aria-hidden="true"></i> </span>
        <input name="ChargedAmount" class="form-control" v-model="totalAmountCharged" disabled aria-describedby="ChargedAmount-addon1" type="number" min="1" step=1 placeholder="$t('Total Amount Charged')" :value="totalAmountCharged" />
      </div>
      <button class="btn btn-primary btn-block recharge-btn" type="button" >{{$t('Refill')}}</button>
    </form>

    <hr>

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
.recharge-btn {
  margin-top: .3em;
}
.month-input .form-control, .year-input .form-control {
  width: 5em;
}
</style>

<script>
import * as urls from '../api_variables'

import axios from 'axios'
var jwtToken = localStorage.getItem('user_token')

// const http = axios.create({
//   headers: { 'Authorization': 'Bearer ' + jwtToken }
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
      fees: 0,
      tax: 0,
      months: 1
    }
  },
  computed: {
    totalAmountCharged () {
      return (parseFloat(this.amount) + parseFloat(this.amount) * 0.018 + 0.18).toFixed(2)
    }
  },
  methods: {
    calculateFees () {
      var amount = 10 * this.months * 100
    },
    getFees (amount, country) {
      var vm = this
      // get fees from API
      axios({
        method: 'POST',
        url: urls.API_URL.CurrentUrl + '/fees',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') },
        data: {
          amount: amount,
          country: country
        }
      }).then(resp => {
        console.log('fees response')
        console.log(resp)

        vm.feesData = resp        
      })
    }
  }
}
</script>
