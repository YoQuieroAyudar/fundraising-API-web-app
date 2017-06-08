import * as urls from '../../api_variables'

const state = {
  Version: '0.6.5',
  CurrentState: '',
  CurrentPage: '',
  PreviousPage: '',
  NexPage: '',
  PageHistory: [],
  loading: false,
  notLoading: true,
  loadingStartedAt: null,
  loadingNormalSeconds: 5,
  api_url: 'http://localhost:8080',
  testMode: false,
  // version number click counter
  VNCC: 0,
  loginAsUser: true,
  showSlide: true,
  waitingFor: {}
}

const getters = {
  waitingForEstablishment (state) {
    return state.waitingFor.POS
  },
  waitingForBalance (state) {
    return state.waitingFor.balance
  },
  getStillLoading (state) {
    if (state.notLoading) {
      console.log('notLoading = ' + state.notLoading)
      return false
    }
    var now = new Date()
    var diff = now - state.loadingStartedAt
    var normal = state.loadingNormalSeconds * 1000
    console.log('diff = ' + diff + ' normal = ' + normal)
    console.log('stillLoading = ' + (diff > normal))
    return diff > normal
  },
  getShowSlide (state) {
    return state.showSlide
  },
  getLoginAsUser (state) {
    return state.loginAsUser
  },
  getAppMode (state) {
    return state.testMode ? 'test' : 'normal'
  },
  getVNCC (state) {
    return state.VNCC
  },
  getVersion (state) {
    return state.Version
  },
  getCurrentState (state) {
    return state.CurrentState
  },
  getCurrentPage (state) {
    return state.CurrentPage
  },
  getPageHistory (state) {
    return state.PageHistory
  },
  getLoading (state) {
    return state.loading
  }
}

const mutations = {
  setWaitingForEstablishment (state, context) {
    state.waitingFor.POS = Boolean(context)
  },
  setWaitingForBalance (state, context) {
    state.waitingFor.balance = Boolean(context)
  },
  setShowSlides (state, context) {
    state.showSlide = Boolean(context)
  },
  setLoginAsUser (state, context) {
    state.loginAsUser = Boolean(context)
  },
  incrementVNCC (state) {
    state.VNCC += 1
    if (state.VNCC === 5) {
      state.testMode = true
      urls.API_URL.LastURL = urls.API_URL.CurrentUrl
      urls.API_URL.CurrentUrl = 'https://api-test.microhuchasolidaria.org'
    } else if (state.VNCC > 5) {
      state.VNCC = 0
      state.testMode = false
    }
  },
  setAPI (state, apiName) {
    console.log('changing api')
    if (apiName === 'mhs') {
      state.api_url = 'https://api.microhuchasolidaria.org'
    } else if (apiName === 'iwth') {
      state.api_url = 'http://api.iwanttohelp.org.uk'
    } else {
      state.api_url = 'https://api.jevaisaider.org'
    }
    urls.API_URL.CurrentUrl = state.api_url
  },
  setCurrentState (state, newState) {
    console.log('setting current_state')
    console.log(newState)
    state.CurrentState = newState
  },
  setCurrentPage (state, newPage) {
    state.PageHistory.push(newPage)
    console.log(newPage)
    state.CurrentPage = newPage
  },
  setLoading (state, newValue) {
    if (newValue) {
      state.loadingStartedAt = new Date()
    }
    state.loading = newValue
    state.notLoading = !state.loading
  },
  goToPreviousPage (state) {
    if (state.PreviousPage) {
      // go back to previous page
      state.CurrentPage = state.PreviousPage
      // set the page you came back from to be next page
      state.NexPage = state.PageHistory.pop()
    }
  },
  goToNextPage (state) {
    if (state.NexPage) {
      // put the current page to to history
      state.PreviousPage = state.CurrentPage
      // go to next page
      state.CurrentPage = state.NexPage
    }
  }
}

const actions = {
  changeCurrentState (context) {
    context.commit('setCurrentState', context)
  },
  changeCurrentPage (context) {
    context.commit('setCurrentPage', context)
  },
  changeLoading (context) {
    context.commit('setLoading', context)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
