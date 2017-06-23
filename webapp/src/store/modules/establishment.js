const state = {
  Establishment: {
    created_at: '',
    updated_at: '',
    unique_id: '',
    qr_code: '',
    qr_url: '',
    geo_x: 0,
    geo_y: 0,
    address: '',
    zip_code: 0,
    city: '',
    country: '',
    id: 0,
    user_id: 0,
    active: false,
    name: '',
    cif: '0',
    end_subscription: '',
    Subscriptions: null
  },
  UserEstablishments: [],
  AllEstablishments: []
}

const getters = {
  getAllEstablishments (state) {
    return state.AllEstablishments
  },
  getUserEstablishments (state) {
    return state.UserEstablishments
  },
  getPOSQRCode (state) {
    return state.Establishment.qr_code
  },
  getEstablishment (state) {
    return state.Establishment
  },
  getPosSubscriptionEnd (state) {
    console.log('getPosSubscriptionEnd')
    if (state.Establishment.end_subscription && state.Establishment.end_subscription === '') {
      return 0
    }
    var end = new Date(state.Establishment.end_subscription)
    var now = new Date()
    var days = Math.floor((end - now) / (3600000 * 24))
    return typeof days === 'number' ? days : parseInt(days)
  }
}

const mutations = {
  setAllEstablishments (state, context) {
    console.log('setting all establishments')
    console.log(context)
    state.AllEstablishments = context
  },
  setUserEstablishments (state, list) {
    state.UserEstablishments = list
  },
  setEstablishment (state, pos) {
    state.Establishment = pos
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
