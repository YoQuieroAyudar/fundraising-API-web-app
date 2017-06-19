const state = {
  RegisterCardResponse: {},
  AccountBalance: 0,
  BalanceCurrency: 'EUR',
  Transactions: []
}

const getters = {
  getTransactions (state) {
    return state.Transactions
  },
  getRegCardResponse (state) {
    return state.RegisterCardResponse
  },
  getRegCardHasResponse (state) {
    // Object.keys(obj).length === 0 && obj.constructor === Object
    // all this is to check if obj is empty
    return Boolean(Object.keys(state.RegisterCardResponse) === 0 && state.RegisterCardResponse === Object)
  },
  getBalance (state) {
    return parseInt(state.AccountBalance)
  },
  getCurrency (state) {
    return state.BalanceCurrency
  }
}

const mutations = {
  setTransactions (state, context) {
    state.Transactions = (context instanceof Array) ? context : []
  },
  setRegCardResponse (state, context) {
    state.RegisterCardResponse = context
  },
  setBalance (state, context) {
    state.AccountBalance = parseInt(context) / 100
  },
  setCurrency (state, context) {
    state.BalanceCurrency = context
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
