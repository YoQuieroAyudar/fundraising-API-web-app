const state = {
  list: {
    'en': {
      'slides': [
        {
          'text': `I create and validate my account. I credit my account with my credit card...`,
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
    },
    'fr': {
      'slides': [
        {
          'text': 'Je crée et je valide mon compte jevaisaider. Je crédite mon compte solidaire  avec ma carte bancaire...',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        },
        {
          'text': 'Je consulte l´ensemble des organismes présents et je décide de faire un don de 2 a 10 euros. Je peux donner plusieurs fois...',
          'style': { backgroundColor: '#CC0066', width: '100%', height: '100%' }
        },
        {
          'text': 'Je demande à l´organisme d\'intérêt général mon certificat fiscal.',
          'style': { backgroundColor: '#CCCC33', width: '100%', height: '100%' }
        },
        {
          'text': 'Mon don est transmis à l\'organisme solidaire sans comissions...',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        }
      ]
    },
    'es': {
      'slides': [
        {
          'text': 'Doy de alta y confirmo por email mi cuenta solidaria yoquieroayudar. Credito mi cuenta con mi tarjeta bancaria...',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        },
        {
          'text': 'Puedo consultar los organismos solidarios presentes y hacer un donativo desde 2 hasta 10 euros. Puedo repetirlo tantas veces como quiera...',
          'style': { backgroundColor: '#CC0066', width: '100%', height: '100%' }
        },
        {
          'text': 'Mi donativo llega a l´organismo solidario sin comisiones...',
          'style': { backgroundColor: '#CCCC33', width: '100%', height: '100%' }
        },
        {
          'text': 'Puedo pedir mi certificado fiscal de donativos.',
          'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
        }
      ]
    },
    'ar': {
      'slides': [
        {
          'text': 'أسجّل وأفتح حساب أريد أن أساعد للإنخراط٠٠٠أشحن رصيدى بواسطة بطاقة ال ائتمان الخاصّة بى٠٠٠',
          'style': { backgroundColor: '#3f51b5', width: '100%', height: '100%' }
        },
        {
          'text': 'سأجد لائحة الجمعيات المنضمّة وسأقرّرأن أتطوّع بمبلغ يتراوح بين 2 و10 يورو حيث يمكننى التجديد٠٠٠',
          'style': { backgroundColor: '#CC0066', width: '100%', height: '100%' }
        },
        {
          'text': 'تبرّعى أحيل إلى المنضّمة الخيرية بنجاح و بصفة مجّانية٠٠٠',
          'style': { backgroundColor: '#CCCC33', width: '100%', height: '100%' }
        }
      ]
    }
  }
}

const getters = {
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
