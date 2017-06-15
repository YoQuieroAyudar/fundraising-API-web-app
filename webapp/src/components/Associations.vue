<template>
  <div class="associations-list">
    <div class="share-button">
      <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
    </div>
    <h1 class="page-top-title">{{ $t('Charities') }}</h1>

    <input type="text" class="form-control" name="search-asso" @input="searchAsso" :placeholder="$t('Search by name or description')" v-model:value="search">
    <div class="association-box"
      @click="selectAssociation(assoc.id)"
      v-for="assoc in $store.getters.getCurrentAssoList">

      <img class="assoc-logo" :src="assoc.logo_url" :alt="$t(assoc.short_description)">
      <h4>{{assoc.name}}</h4>
      <p>{{assoc.description}}</p>
      <p><strong>{{$t(assoc.country)}}</strong></p>

    </div>
  </div>
</template>

<script>
import * as urls from '../api_variables'

import axios from 'axios'

export default {
  beforeMount () {
    console.log('beforeUpdate')
    if (this.$store.getters.getAssociations.length === 0) {
      console.log('associations length = 0')
      console.log('Getting new list')
      this.getAssociationsFromAPI()
    }
  },
  data () {
    return {
      associations: [],
      search: '',
      searchTimout: 0
    }
  },
  methods: {
    searchAsso (e) {
      console.log('searchAsso')
      var searchText = this.search
      var vm = this
      clearTimeout(this.searchTimout)
      this.searchTimout = setTimeout(function () {
        var assos = vm.$store.getters.getAssociations.filter(asso => {
          var name = asso.name !== undefined ? asso.name.toLowerCase() : ''
          var description = asso.description !== undefined ? asso.description.toLowerCase() : ''
          searchText = searchText.toLowerCase()
          return (name.indexOf(searchText) > -1) || (description.indexOf(searchText) > -1)
        })
        console.log('associations found ' + assos.length)
        vm.$store.commit('setCurrentAssoList', assos)
      }, 500)
    },
    selectAssociation (assocId) {
      console.log(assocId)
      this.$store.commit('selectAssoById', assocId)
      this.$events.emit('goToPageEvent', 'asso_details/' + assocId)
    },
    getAssociationsFromAPI () {
      var vm = this
      let country = localStorage.getItem('country_code')
      if (country == null) {
        country = 'ES'
      }
      console.log('Searching for ' + country)
      let url = urls.API_URL.CurrentUrl + urls.ASSO_SEARCH_URL
      var data = {}
      data.POS_id = 1

      if (country !== undefined && country !== null && country !== '') {
        url += '?country=' + country
        data.country = country
      }

      var jwtToken = localStorage.getItem('user_token')

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

  }
}
</script>
<style scoped>
.associations-list {

}
.association-box {
  box-shadow: 0 1px 8px #999;
  margin: .2em;
  margin-bottom: .4em;
  cursor: pointer;
  padding: .2em;
}
.assoc-logo {
  float: left;
  margin: .3em;
  width: 4em;
  box-shadow: 1px 1px 1px #000;
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
