<template>
  <div class="slides-area">
    <button type="button" class="btn btn-primary btn-xs" @click="skipSlide" name="skip">{{$t('Skip')}}</button>

    <div class="wrapword">

      <carousel :autoplay="true" :autoplayTimeout="autoplayTimout" :autoplayHoverPause="true" :navigationEnabled="true" :perPage="1">
        <slide :style="slide.style" :key="index" v-for="(slide, index) in currentSlides">
          <p class="label" v-html="slide.text"></p>
        </slide>
      </carousel>

    </div>

  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  mounted () {
    var vm = this
    var autoTimeout = (4 * this.autoplayTimout) || this.autoplayTimout
    console.log('autoTimeout = ' + autoTimeout)
    setTimeout(() => { vm.$events.emit('skipSlideEvent') }, autoTimeout)
  },
  methods: {
    skipSlide (e) {
      e.preventDefault()
      console.log('skipping slide show')
      this.$events.emit('skipSlideEvent')
    }
  },
  data () {
    return {
      autoplayTimout: 5000,
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
              'text': 'Je crée et je valide mon compte jevaisaider. je crédite mon compte solidaire  avec ma carte bancaire...',
              'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
            },
            {
              'text': 'Je consulte l´ensemble des organismes présents et je décide de faire un don de 2 a 10 euros. je peux donner plusieurs fois...',
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
              'text': 'Doy de alta y confirmo por email mi cuenta solidaria yoquieroayudar. credito mi cuenta con mi tarjeta bancaria...',
              'style': { backgroundColor: '#FF9933', width: '100%', height: '100%' }
            },
            {
              'text': 'Puedo consultar los organismos solidarios presentes y hacer un donativo desde 2 hasta 10 euros. puedo repetirlo tantas veces como quiera...',
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
  },
  computed: {
    currentSlides () {
      var lang = localStorage.getItem('user_locale')
      if (lang === null) {
        lang = 'en'
      }
      console.log('item')
      var langSlides = this.list[lang.toLowerCase()]
      if (!langSlides) {
        // langSlides = this.list.en
      }
      console.log('langSlides')
      for (var i = 0; i < langSlides.slides.length; i++) {
        console.log('slide: ' + i)
        console.log(langSlides.slides[i].text)
      }

      return langSlides.slides
    }
  },
  components: {
    Carousel,
    Slide
  }
}
</script>
<style scoped>
.VueCarousel-slide {
  position: relative;
  background: #42b983;
  color: #fff;
  font-family: Arial;
  font-size: 2em;
  text-align: center;
  min-height: 400px;
  width: 200px;
}

.label {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  transform: translate(-50%, -50%);
  width: 100%;
  overflow: hidden;

  white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  white-space: pre-wrap;       /* css-3 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
  white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
  // word-break: break-all;
  white-space: normal;
  line-height: 1.5em;
}
.wrapword{


}
.slides-area {

}
</style>
