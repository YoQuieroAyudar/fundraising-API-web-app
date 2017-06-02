<template>
  <div class="logout-area">
    <div class="nav navbar-default">
      <button class="btn btn-danger btn-xs pull-right" :title="$t('Logout')" @click="logoutUser">{{$t('Logout')}}</button>
      <button class="btn btn-default btn-xs pull-right" :title="$t('Settings')" @click="goToSettingsPage"> <i class="fa fa-cog fa-fw"></i> </button>
      <label v-if="$store.getters.getLoginAsUser" :class="balanceLabelClasses" :title="$t('Wallet Balance')" @click="goToSolidarityAccount"> {{$store.getters.getBalance}} {{$t($store.getters.getCurrency)}} </label>
      <label v-else :class="daysLeftLabelClasses" :title="$t('Days left from subscription')" @click="gotToSubscription"> {{$t('{x} day ::: {x} days', {x: $store.getters.getPosSubscriptionEnd}, $store.getters.getPosSubscriptionEnd)}} </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToSettingsPage (e) {
      // this.$store.commit('setCurrentPage', 'settings')
      this.$events.emit('goToPageEvent', 'settings')
    },
    gotToSubscription (e) {
      this.$events.emit('goToPageEvent', 'subscription')
      this.$store.commit('resetMessages')
    },
    goToSolidarityAccount (e) {
      e.preventDefault()
      // this.$store.commit('setCurrentPage', 'solidarity')
      this.$events.emit('goToPageEvent', 'solidarity')
      this.$store.commit('resetMessages')
    },
    logoutUser (e) {
      e.preventDefault()
      this.$events.emit('logoutEvent')
    }
  },
  computed: {
    walletBalance () {
      return this.$store.getters.getBalance
    },
    daysLeftLabelClasses () {
      var cs = 'label pull-right balance-label label-'
      if (this.$store.getters.getPosSubscriptionEnd > 15) {
        cs += 'success'
      } else if (this.$store.getters.getPosSubscriptionEnd > 7) {
        cs += 'warning'
      } else {
        cs += 'danger'
      }
      return cs
    },
    balanceLabelClasses () {
      var cs = 'label pull-right balance-label label-'
      this.walletBalance > 0 ? cs += 'success' : cs += 'warning'
      return cs
    },
    getUserEmail () {
      var email = this.$store.state.user.user.email
      email = email.split('@')
      if (email.length > 1) {
        return email[1]
      }
      return this.$store.state.user.user.email
    }
  }
}
</script>
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
.logout-area button {
  margin-left: .2em;
}
.logout-area {
  height: 2em;
}
.logout-area .nav {
  height: 2.2em;
  padding: .3em;
  margin:.3em;
  border-radius: .3em;
  box-shadow: inset 0 0 .3em #AAA;
}
.balance-label {
  padding: .15em;
  padding-left: .5em;
  padding-right: .5em;
  font-size: 1.2em;
  cursor: pointer;
}
</style>
