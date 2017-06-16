<template>
  <div v-if="$store.getters.getCurrentState !== 'login' && $store.getters.getCurrentState !== ''" class="logout-area">
    <div class="nav navbar-default">
      <button class="btn btn-danger btn-xs pull-right" :title="$t('Logout')" @click="logoutUser">{{$t('Logout')}}</button>
      <button class="btn btn-default btn-xs pull-right" :title="$t('Settings')" @click="goToSettingsPage"> <i class="fa fa-cog fa-fw"></i> </button>
      <label v-if="$store.getters.getLoginAsUser" :class="balanceLabelClasses" :title="$t('Wallet Balance')" @click="goToSolidarityAccount"> {{$store.getters.getBalance}} &euro; </label>
      <label v-else :class="daysLeftLabelClasses" :title="$t('Days left from subscription')" @click="gotToSubscription"> {{$t('{x} day ::: {x} days', {x: $store.getters.getPosSubscriptionEnd}, $store.getters.getPosSubscriptionEnd)}} </label>
      <a class="btn btn-xs our-twitter-link" :title="$t('twitter')" target="_blank" :href="twitterUrl">  <i class="fa fa-twitter fa-fw"></i>  </a>
      <a class="btn btn-xs our-facebook-link" :title="$t('facebook')" target="_blank" :href="facebookUrl">  <i class="fa fa-facebook fa-fw"></i>  </a>
      <a class="btn btn-xs our-linkedin-link" :title="$t('LinkedIn')" target="_blank" :href="linkedInUrl">  <i class="fa fa-linkedin fa-fw"></i>  </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      socialLinks: [
        {
          db: 'jva',
          links: {
            facebook: 'https://www.facebook.com/JeVaisAider',
            twitter: 'https://twitter.com/JeVaisAider',
            linkedIn: 'https://www.linkedin.com/groups/8527508'
          }
        },
        {
          db: 'mhs',
          links: {
            facebook: 'https://www.facebook.com/YQuieroAyudar',
            twitter: 'https://twitter.com/YQuieroAyudar?lang=es',
            linkedIn: 'https://www.linkedin.com/groups/8508381'
          }
        }
      ]
    }
  },
  methods: {
    goToSettingsPage (e) {
      // this.$store.commit('setCurrentPage', 'settings')
      this.$events.emit('goToPageEvent', 'settings')
    },
    gotToSubscription (e) {
      this.$events.emit('goToPageEvent', 'subscription')
      this.$store.commit('resetMessages')
      this.$events.$emit('fetchEstablishmentEvent', {})
    },
    goToSolidarityAccount (e) {
      e.preventDefault()
      // this.$store.commit('setCurrentPage', 'solidarity')
      this.$events.emit('goToPageEvent', 'solidarity')
      this.$store.commit('resetMessages')
      this.$events.$emit('acountUpdate', {})
    },
    logoutUser (e) {
      e.preventDefault()
      this.$events.emit('logoutEvent')
    }
  },
  computed: {
    linkedInUrl () {
      var apiDb = this.$store.getters.getApiDB
      for (var i = 0; i < this.socialLinks.length; i++) {
        console.log(this.socialLinks[i].db === apiDb)
        if (this.socialLinks[i].db === apiDb) {
          return this.socialLinks[i].links.linkedIn
        }
      }
      return this.socialLinks[0].links.linkedIn
    },
    twitterUrl () {
      var apiDb = this.$store.getters.getApiDB
      for (var i = 0; i < this.socialLinks.length; i++) {
        console.log(this.socialLinks[i].db === apiDb)
        if (this.socialLinks[i].db === apiDb) {
          return this.socialLinks[i].links.twitter
        }
      }
      return this.socialLinks[0].links.twitter
    },
    facebookUrl () {
      var apiDb = this.$store.getters.getApiDB
      for (var i = 0; i < this.socialLinks.length; i++) {
        console.log(this.socialLinks[i].db === apiDb)
        if (this.socialLinks[i].db === apiDb) {
          return this.socialLinks[i].links.facebook
        }
      }
      return this.socialLinks[0].links.facebook
    },
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
.logout-area button {
  margin-left: .2em;
}
.logout-area {
  height: 2em;
}
.logout-area .nav {
  height: 2.2em;
  padding: .3em;
  margin:0;
  margin-top: .3em;
  margin-right: .1em;
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
.our-twitter-link,
.our-facebook-link,
.our-linkedin-link {
  border: 1px solid #EDF;
  padding: .1em;
  padding-left: .3em;
  padding-right: .3em;
  border-radius: .3em;
}
.our-facebook-link {
  background-color: #3b5998;
  color: #fff;
}
.our-twitter-link {
  background-color: #55acee;
  color: #fff;
}
.our-linkedin-link {
  background-color: #007bb5;
  color: #fff;
  margin-right: .3em;
}
.our-facebook-link:hover {
  background-color: #fff;
  color: #3b5998;
}
.our-twitter-link:hover {
  background-color: #fff;
  color: #55acee;
}
.our-linkedin-link:hover {
  background-color: #fff;
  color: #007bb5;
  margin-right: .3em;
}
</style>
