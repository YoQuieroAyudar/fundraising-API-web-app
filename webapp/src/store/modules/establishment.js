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
  }
}

const getters = {
  getPOSQRCode (state) {
    return state.Establishment.qr_code
  },
  getEstablishment (state) {
    return state.Establishment
  }
}

const mutations = {
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
