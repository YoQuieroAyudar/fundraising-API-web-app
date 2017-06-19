<template>
  <div>
    <div class="share-button">
      <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
    </div>
    <h1 class="page-top-title">{{$t('My Donations')}}</h1>

    <br>

    <div class="">
      <div class="panel panel-default">
        <!-- Default panel contents -->
        <!-- <div class="panel-heading">{{$t('Transactions')}}</div> -->

        <!-- Table -->
        <table class="table">
          <thead>
            <tr>
              <th>{{$t('Charity')}}</th>
              <th>{{$t('Amount')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in $store.getters.getTransactions">
              <td>
                <h4 class="charity-name">
                  {{item.association.name}}
                  <label class="date-label">{{formatDate(item.created_at)}}</label>
                </h4>

              </td>
              <td>
                <strong>{{formatEuros(item.amount)}} &euro;</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import * as urls from '../api_variables'
import axios from 'axios'

export default {
  beforeMount () {
    this.getTransactions()
  },
  data () {
    var now = new Date()
    var day, year, month
    day = now.getDate()
    month = now.getMonth()
    year = now.getFullYear()
    return {
      startDate: '2017-01-01',
      endDate: `${year}-${month}-${day}`
    }
  },
  methods: {
    formatDate (date) {
      var now = new Date(date)

      var day, year, month
      day = now.getDate()
      month = now.getMonth()
      year = now.getFullYear()

      day = day < 10 ? '0' + day : day
      month = month < 10 ? '0' + month : month

      return day + '/' + month + '/' + year
    },
    formatEuros (amount) {
      return (parseFloat(amount) / 100).toFixed(2)
    },
    getTransactions () {
      var vm = this
      var query = '?'
      query += 'before_date=' + encodeURIComponent(this.startDate)
      query += 'after_date=' + encodeURIComponent(this.endDate)
      console.log(query)

      axios({
        url: urls.API_URL.CurrentUrl + '/donation',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
      }).then(resp => {
        console.log('getTransactions response')
        console.log(resp)
        if (resp.data !== undefined) {
          if (resp.data.donations) {
            vm.$store.commit('setTransactions', resp.data.donations)
          }
        }
      })
    }
  }
}
</script>
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
.date-label {
  font-size: .8em;
  font-weight: lighter;
}
.charity-name {
  margin-top: 0;
}
</style>
