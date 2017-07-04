<template>
  <div class="dashboard">

    <div class="modal-wrapper">
      <div class="modal-inner">
        <vodal :show="showTerms" :width="250" :height="300" animation="rotate" @hide="showTerms = false">
            <terms-modal :selected_country="newAsso.country"></terms-modal>
        </vodal>
      </div>
    </div>


    <h4 class="page-top-title">{{$t('Dashboard')}}</h4>
    <h4>{{$t('Associations')}}</h4>
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#all-assoc">{{$t('All')}}</a></li>
      <li><a data-toggle="tab" href="#add-assoc">{{$t('Add')}}</a></li>
      <li><a data-toggle="tab" href="#update-assoc">{{$t('Update')}}</a></li>
    </ul>
    <div class="tab-wrapper associations-tabs">
      <div class="tab-content">

        <div id="all-assoc" class="tab-pane fade in active">
          <p>{{$t('All Associations')}}</p>
          <pre>{{$store.getters.getAssociations.length}}</pre>
          <ul class="list-group">
            <li v-for="item in $store.getters.getAssociations" class="list-group-item">
              <div class="association-list-item">
                <span class="asso-name">{{item.name}}</span>
                <button class="btn btn-primary btn-xs edit-asso-btn pull-right" type="button" name="button"> <i class="fa fa-pencil fa-fw"></i> </button>
              </div>
            </li>
          </ul>
        </div>

        <div id="add-assoc" class="tab-pane fade">
          <p>{{$t('Add New Association')}}</p>

          <form class="form" id="add-asso-form">

            <ul class="list-group">

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('First name')" id="fname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
                  <input required name="first_name" class="form-control" v-model="newAsso.first_name" aria-describedby="fname-addon1" type="text" :placeholder="$t('First name')" :value="newAsso.first_name" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Last name')" id="lname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
                  <input required name="last_name" class="form-control" v-model="newAsso.last_name" aria-describedby="lname-addon1" type="text" :placeholder="$t('Last name')" :value="newAsso.last_name" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Birthday')" id="birthday-addon1"> <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> </span>
                  <input name="birthday" class="form-control" v-model="newAsso.birthday" aria-describedby="birthday-addon1" type="date" :placeholder="$t('Birthday')" :value="newAsso.birthday" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Nationality')" id="nationality-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
                  <select required class="form-control" aria-describedby="nationality-addon1" v-model="newAsso.nationality">
                    <option v-for="ctr in $store.getters.getAllCountries" :disabled="ctr.code == '_'" :selected="ctr.code == 'ES'" @changed="newAsso.nationality = ctr.code" :value="ctr.code">{{$t(ctr.name)}}</option>
                  </select>
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Country of residence')" id="country_of_residence-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
                  <select required class="form-control" aria-describedby="country_of_residence-addon1" v-model="newAsso.country_of_residence">
                    <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signin.country_of_residence = country.code" :value="country.code"> {{$t(country.name)}}</option>
                  </select>
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Association name')" id="name-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
                  <input required name="name" class="form-control" v-model="newAsso.name" aria-describedby="name-addon1" type="text" :placeholder="$t('Association name')" :value="newAsso.name" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('description')" id="description-addon1"> <i class="fa fa-map-signs fa-fw" aria-hidden="true"></i> </span>
                  <input name="description" class="form-control" v-model="newAsso.description"  aria-describedby="description-addon1" type="text" :placeholder="$t('description')" :value="newAsso.description" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Logo URL')" id="logo_url-addon1"> <i class="fa fa-anchor fa-fw" aria-hidden="true"></i> </span>
                  <input name="logo_url" class="form-control" v-model="newAsso.logo_url"  aria-describedby="logo_url-addon1" type="text" :placeholder="$t('Logo URL')" :value="newAsso.logo_url" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Twitter Username')" id="twitter_username-addon1"> <i class="fa fa-anchor fa-fw" aria-hidden="true"></i> </span>
                  <input required name="twitter_username" class="form-control" v-model="newAsso.twitter_username"  aria-describedby="twitter_username-addon1" type="text" :placeholder="$t('Twitter Username')" :value="newAsso.twitter_username" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('IBAN')" id="iban-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
                  <input name="bank_account_iban" class="form-control" v-model="newAsso.bank_account_iban" aria-describedby="iban-addon1" type="text" :placeholder="$t('IBAN')" :value="newAsso.bank_account_iban" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('BIC')" id="bic-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
                  <input name="bank_account_bic" class="form-control" v-model="newAsso.bank_account_bic" aria-describedby="bic-addon1" type="text" :placeholder="$t('BIC')" :value="newAsso.bank_account_bic" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Country')" id="country-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
                  <select required class="form-control" aria-describedby="country-addon1" v-model="newAsso.country">
                    <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="newAsso.country = country.code" :value="country.code">{{$t(country.name)}}</option>
                  </select>
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('City')" id="city-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
                  <input required name="city" class="form-control" v-model="newAsso.city" aria-describedby="city-addon1" type="text" :placeholder="$t('City')" :value="newAsso.city" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('address')" id="address-addon1"> <i class="fa fa-map-signs fa-fw" aria-hidden="true"></i> </span>
                  <input name="address" class="form-control" v-model="newAsso.address"  aria-describedby="address-addon1" type="text" :placeholder="$t('address')" :value="newAsso.address" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Email')" id="email-addon1"> <i class="fa fa-envelope fa-fw" aria-hidden="true"></i> </span>
                  <input required name="mail" class="form-control" v-model="newAsso.mail" aria-describedby="email-addon1" type="email" :placeholder="$t('Email')" :value="newAsso.email" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Password')" id="password-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
                  <input required name="password" class="form-control" v-model="newAsso.password"  aria-describedby="password-addon1" type="password" :placeholder="$t('Password')" :value="newAsso.password" />
                </div>
              </li>

              <li class="list-group-item">
                <div dir="ltr" class="input-group">
                  <span class="input-group-addon" :title="$t('Terms and conditions')" id="terms-addon1"> <input required name="accept_terms" v-model="acceptTerms" @click="toggleTermsModal" :checked="acceptTerms" type="checkbox" :value="acceptTerms" /> </span>
                  <label class="form-control" for="accept_terms"  aria-describedby="terms-addon1">{{$t('Terms and conditions')}}</label>
                </div>
              </li>

              <li class="list-group-item">
                <button class="btn btn-primary btn-block newAsso-btn" type="submit" :disabled="!acceptTerms" @click="registerAssoUser"> <i class="fa fa-paper-plane" aria-hidden="true"></i> {{$t('Register')}}</button>
              </li>
            </ul>
          </form>
        </div>

        <div id="update-assoc" class="tab-pane fade">
          <p>{{$t('Update Associations.')}}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import * as urls from '../api_variables'
import Terms from './Terms.vue'

export default {
  data () {
    return {
      tabs: [],
      acceptTerms: false,
      showTerms: false,
      newAsso: {
        mail: '',
        password: '',
        name: '',
        status: 'ASSO',
        first_name: '',
        last_name: '',
        birthday: '',
        nationality: '',
        country_of_residence: '',
        bank_account_iban: '',
        bank_account_bic: '',
        country: '',
        address: '',
        description: '',
        logo_url: '',
        twitter_username: ''
      }
    }
  },
  methods: {
    registerAssoUser (e) {
      e.preventDefault()
      var vm = this
      var creds = this.newAsso
      creds.birthday = new Date(creds.birthday)
      var url = urls.API_URL.CurrentUrl + '/signup'

      axios({
        method: 'POST',
        url: url,
        data: creds
      }).then(resp => {
        console.log('Association registration response')
        console.log(resp)
        if (resp.status === 200) {
          document.getElementById('add-asso-form').reset()
          vm.$store.commit('setSuccess', 'Association registration successful')
          this.$events.emit('goToPageEvent', 'admin')
        }
      }).catch(err => {
        console.log('Association registration error')
        console.log(err)
        vm.$store.commit('setErrors', ['Association registration failed, please try again'])
      })
      return false
    },
    updateAddress () {
      var ad = (this.newAsso.address + ', ' + this.newAsso.zip_code + ' ' + this.newAsso.city)
      this.address = ad
    },
    toggleTermsModal (e) {
      e.preventDefault()
      this.showTerms = !this.showTerms
    }
  },
  components: {
    'terms-modal': Terms
  }
}
</script>
<style scoped>
.dashboard {
  background-image: url('/bg.png');
  background-color: #F5F5F5;
  padding: .3em;
  margin: 0;
  margin-top: .3em;
}
.tab-wrapper {
  background-color: #fff;
}
.nav-tabs {
  margin-bottom: 0;
}
.input-group, .input-group-addon, .form-control {
  border-radius: .1em;
  border: none;
}
.form-control {
  box-shadow: inset 0 0 .4em #888;
}
.list-group-item {
  padding: .1em;
}
.association-list-item {
  padding: .3em;
}
.edit-asso-btn {
  margin-right: -0.25em;
  margin-top: -0.15em;
  /*margin-bottom: -0.4em;*/
  height: 2em;
}
</style>
