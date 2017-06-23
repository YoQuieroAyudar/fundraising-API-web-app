<template>
  <div>

    <div class="modal-wrapper">
      <div class="modal-inner">
        <vodal :show="showTerms" :width="250" :height="300" animation="rotate" @hide="showTerms = false">
            <terms-modal :selected_country="newAsso.country"></terms-modal>
        </vodal>
      </div>
    </div>


    <h4 class="page-top-title">{{$t('Dashboard')}}</h4>
    <h3>{{$t('Associations')}}</h3>
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#home">{{$t('All')}}</a></li>
      <li><a data-toggle="tab" href="#menu1">{{$t('Add')}}</a></li>
      <li><a data-toggle="tab" href="#menu2">{{$t('Update')}}</a></li>
    </ul>

    <div class="tab-content">

      <div id="home" class="tab-pane fade in active">
        <h3>{{$t('All Associations')}}</h3>
        <p>{{$t('All Associations')}}</p>
      </div>

      <div id="menu1" class="tab-pane fade">
        <h5>{{$t('Add')}}</h5>

        <form class="form">

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('First name')" id="fname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
            <input name="first_name" class="form-control" v-model="newAsso.first_name" aria-describedby="fname-addon1" type="text" :placeholder="$t('First name')" :value="newAsso.first_name" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Last name')" id="lname-addon1"> <i class="fa fa-user-o fa-fw" aria-hidden="true"></i> </span>
            <input name="last_name" class="form-control" v-model="newAsso.last_name" aria-describedby="lname-addon1" type="text" :placeholder="$t('Last name')" :value="newAsso.last_name" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Birthday')" id="birthday-addon1"> <i class="fa fa-birthday-cake fa-fw" aria-hidden="true"></i> </span>
            <input name="birthday" class="form-control" v-model="newAsso.birthday" aria-describedby="birthday-addon1" type="date" :placeholder="$t('Birthday')" :value="newAsso.birthday" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Nationality')" id="nationality-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
            <select class="form-control" aria-describedby="nationality-addon1" v-model="newAsso.nationality">
              <option v-for="ctr in $store.getters.getAllCountries" :disabled="ctr.code == '_'" :selected="ctr.code == 'ES'" @changed="newAsso.nationality = ctr.code" :value="ctr.code">{{$t(ctr.name)}}</option>
            </select>
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Country of residence')" id="country_of_residence-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
            <select class="form-control" aria-describedby="country_of_residence-addon1" v-model="newAsso.country_of_residence">
              <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="signin.country_of_residence = country.code" :value="country.code"> {{$t(country.name)}}</option>
            </select>

          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Association name')" id="name-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
            <input name="name" class="form-control" v-model="newAsso.name" aria-describedby="name-addon1" type="text" :placeholder="$t('Association name')" :value="newAsso.name" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('description')" id="description-addon1"> <i class="fa fa-map-signs fa-fw" aria-hidden="true"></i> </span>
            <input name="description" class="form-control" v-model="newAsso.description"  aria-describedby="description-addon1" type="text" :placeholder="$t('description')" :value="newAsso.description" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Logo URL')" id="logo_url-addon1"> <i class="fa fa-anchor fa-fw" aria-hidden="true"></i> </span>
            <input name="first_name" class="form-control" v-model="newAsso.logo_url"  aria-describedby="logo_url-addon1" type="text" :placeholder="$t('Logo URL')" :value="newAsso.logo_url" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('IBAN')" id="cif-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
            <input name="iban" class="form-control" v-model="newAsso.cif" aria-describedby="cif-addon1" type="text" :placeholder="$t('IBAN')" :value="newAsso.bank_account_iban" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('BIC')" id="bic-addon1"> <i class="fa fa-institution fa-fw" aria-hidden="true"></i> </span>
            <input name="bic" class="form-control" v-model="newAsso.bic" aria-describedby="bic-addon1" type="text" :placeholder="$t('BIC')" :value="newAsso.bank_account_bic" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Country')" id="country-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> </span>
            <select class="form-control" aria-describedby="country-addon1" v-model="newAsso.country">
              <option v-for="country in $store.getters.getAllCountries" :disabled="country.code == '_'" :selected="country.code == 'ES'" @changed="newAsso.country = country.code" :value="country.code">{{$t(country.name)}}</option>
            </select>
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('City')" id="city-addon1"> <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i> </span>
            <input name="city" class="form-control" v-model="newAsso.city" aria-describedby="city-addon1" type="text" :placeholder="$t('City')" :value="newAsso.city" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Zip Code')" id="zip_code-addon1"> <i class="fa fa-map-pin fa-fw" aria-hidden="true"></i> </span>
            <input name="zip_code" class="form-control" v-model="newAsso.zip_code"  aria-describedby="zip_code-addon1" type="number" :placeholder="$t('Zip Code')" :value="newAsso.zip_code" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('address')" id="address-addon1"> <i class="fa fa-map-signs fa-fw" aria-hidden="true"></i> </span>
            <input name="first_name" class="form-control" v-model="newAsso.address"  aria-describedby="address-addon1" type="text" :placeholder="$t('address')" :value="newAsso.address" />
          </div>



          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Email')" id="email-addon1"> <i class="fa fa-envelope fa-fw" aria-hidden="true"></i> </span>
            <input name="mail" class="form-control" v-model="newAsso.mail" aria-describedby="email-addon1" type="email" :placeholder="$t('Email')" :value="newAsso.email" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Password')" id="password-addon1"> <i class="fa fa-lock fa-fw" aria-hidden="true"></i> </span>
            <input name="password" class="form-control" v-model="newAsso.password"  aria-describedby="password-addon1" type="password" :placeholder="$t('Password')" :value="newAsso.password" />
          </div>

          <div dir="ltr" class="input-group">
            <span class="input-group-addon" :title="$t('Terms and conditions')" id="terms-addon1"> <input name="accept_terms" v-model="acceptTerms" @click="toggleTermsModal" :checked="acceptTerms" type="checkbox" :value="acceptTerms" /> </span>
            <label class="form-control" for="accept_terms"  aria-describedby="terms-addon1">{{$t('Terms and conditions')}}</label>
          </div>

          <button class="btn btn-primary btn-block newAsso-btn" @click="newAssoUser" :disabled="!acceptTerms" > <i class="fa fa-paper-plane" aria-hidden="true"></i> {{$t('Sign up')}}</button>

        </form>
      </div>

      <div id="menu2" class="tab-pane fade">
        <h3>Menu 2</h3>
        <p>Some content in menu 2.</p>
      </div>

    </div>

  </div>
</template>

<script>

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
    newAssoUser () {
    },
    updatedAddress () {
      var ad = (this.newAsso.address + ', ' + this.newAsso.zip_code + ' ' + this.newAsso.city)
      this.address = ad
    },
    toggleTermsModal (e) {
      e.preventDefault()
      this.showTerms = !this.showTerms
    }
  }
}
</script>
<style scoped>

</style>
