const state = {
  list: [],
  allAssociations: [],
  selected: {}
}

const getters = {
  getCurrentAssoList (state) {
    return state.list
  },
  getAssociations (state) {
    return state.allAssociations
  },
  getAssoById (state, id) {
    return state.allAssociations.filter(asso => asso.id === id)
  },
  getSelectedAssociation (state) {
    return state.selected
  }
}

const mutations = {
  setCurrentAssoList (state, currentList) {
    state.list = currentList
  },
  selectAssoById (state, id) {
    var assos = state.allAssociations.filter(asso => asso.id === id)
    state.selected = assos[0]
  },
  setAssoList (state, context) {
    if (context.list) {
      console.log('setting asso allAssociations')
      state.allAssociations = context.list
      state.list = context.list
      return
    }
    console.log('not setting asso list')
  },
  resetAssoList (state) {
    state.allAssociations = []
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
