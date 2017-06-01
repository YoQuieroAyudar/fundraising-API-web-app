const state = {
  user: {
    email: '',
    password: ''
  },
  jwt_token: '',
  userType: ''
}

const getters = {
  getUserType (state) {
    return state.userType
  },
  getLogin (state) {
    return state.jwt_token !== ''
  },
  getEmail (state) {
    return state.user.email
  },
  getToken (state) {
    return state.jwt_token
  }
}

const mutations = {
  setUserType (state, type) {
    state.userType = type.toUpperCase()
  },
  setToken (state, token) {
    state.jwt_token = token
  },
  login (state) {

  },
  logout (state) {
    state.jwt_token = ''
  },
  updateEmail (state, email) {
    state.user.email = email
  },
  updatePassword (state, password) {
    state.user.password = password
  }
}

const actions = {
  login (context) {
    context.commit('loginMutation')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
