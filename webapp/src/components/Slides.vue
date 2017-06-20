<template>
  <div class="slides-area">
    <div class="wrapword">

      <carousel :autoplay="true" :autoplayTimeout="autoplayTimout" :autoplayHoverPause="true" :navigationEnabled="true" :perPage="1">
        <slide :style="slide.style" :key="index" v-for="(slide, index) in $store.getters.getCurrentSlides.slides">
          <button type="button" class="btn btn-default btn-xs skip-btn" :title="$t('Skip')" @click="skipSlide" name="skip"> <i class="fa fa-close fa-fw" aria-hidden="true"></i> </button>
          <div v-if="index === 0" class="slider-image">
            <img :src="$store.getters.getSlideImage.img" alt="">
          </div>
          <div v-else class="label"  dir="ltr">
            <p class="sentence" dir="ltr" v-for="text in seperatedSentences($t(slide.text))">{{text}}</p>
          </div>
        </slide>
      </carousel>

    </div>

  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  beforeCreate () {
    // this.$events.listen('languageChanged', lang => {
    //   this.currentSlides = this.getSlidesByLang(lang)
    // })
  },
  mounted () {
    var vm = this
    var autoTimeout = (4 * this.autoplayTimout) || this.autoplayTimout
    setTimeout(() => {
      if (vm.$store.getters.getShowSlide) {
        vm.$events.emit('skipSlideEvent')
      }
    }, autoTimeout + 3000)
  },
  methods: {
    seperatedSentences (value) {
      if (!value) {
        return ''
      }
      value = value.toString().split('<br>')
      return value
    },
    skipSlide (e) {
      e.preventDefault()
      this.$events.emit('skipSlideEvent')
    }
  },
  data () {
    return {
      autoplayTimout: 3500
    }
  },
  computed: {
    getSlideImage () {
      var lang = localStorage.getItem('user_locale')
      if (lang === 'es') {
        return 'slide-img-es.png'
      } else {
        return 'slide-img-fr.png'
      }
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
  /*padding-top: 10em;*/
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
  margin-top: 0;
  margin-bottom: -3em;
}
.wrapword{


}
.slides-area {

}
/*.sentence {
  clear: both;
}*/
.slider-image img {
  top: 50%;
  left: 50%;
  width: 100%;
  border: 1px solid #000;
}
.skip-btn {
  position: absolute;
  height: 2em;
  right: 0;
  top: .2em;
  margin-bottom: -3em;
  margin-right: .1em;
  border-radius: 0;
  border: 0;
  z-index: 1000;
}
</style>
