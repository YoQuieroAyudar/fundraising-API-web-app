const state = {
  images: {
    'en': {'img': 'slide-img-fr.png', 'title': ''},
    'ar': {'img': 'slide-img-fr.png', 'title': ''},
    'es': {'img': 'slide-img-es.png', 'title': ''},
    'fr': {'img': 'slide-img-fr.png', 'title': ''},
    'it': {'img': 'slide-img-fr.png', 'title': ''},
    'pt': {'img': 'slide-img-fr.png', 'title': ''},
    'ru': {'img': 'slide-img-fr.png', 'title': ''}
  },
  list: {
    'en': {
      'slides': [
        {
          'text': '',
          'style': { backgroundColor: '#FFF', width: '100%', height: '100%' }
        },
        {
          'text': 'I create and validate my account.<br>I credit my account with my credit card...',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        },
        {
          'text': 'I can browse non-profit charities and I decide to donate from 2 to 10 euros. I can give as many times as I want...',
          'style': { backgroundColor: '#CC0066', width: '100%', height: '100%' }
        },
        {
          'text': 'my donation is transmitted to the charity with 0 comission...',
          'style': { backgroundColor: '#CCCC33', width: '100%', height: '100%' }
        },
        {
          'text': 'I can ask the charity for my tax certificate.',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        }
      ]
    }
  }
}

const getters = {
  getSlideImage (state) {
    var lang = localStorage.getItem('user_locale')
    if (lang === '' || lang === null) {
      return state.images.fr
    }
    if (state.images[lang] !== undefined) {
      return state.images[lang]
    }
    return state.images.fr
  },
  getCurrentSlides (state) {
    var lang = localStorage.getItem('user_locale')
    if (lang === '' || lang === null) {
      return state.list.en
    }
    if (state.list[lang] !== undefined) {
      return state.list[lang]
    }
    return state.list.en
  }
}

const mutations = {
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
