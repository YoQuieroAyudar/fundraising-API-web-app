<template>
  <div class="slides-area">
    <div class="wrapword">

      <carousel :autoplay="true" :autoplayTimeout="autoplayTimout" :autoplayHoverPause="true" :navigationEnabled="true" :perPage="1">
        <slide :style="image.styles" :key="index" v-for="(image, index) in getImages">
          <button type="button" class="btn btn-default skip-btn" :title="$t('Skip')" @click="skipSlide" name="skip"> <!-- <i class="fa fa-close fa-fw" aria-hidden="true"></i>--> X </button>
          <div class="slider-image">
            <img :src="image.img" :alt="image.title">
          </div>
        </slide>

        <slide :style="slide.style" :key="index" v-for="(slide, index) in $store.getters.getCurrentSlides.slides">
          <button type="button" class="btn btn-default skip-btn" :title="$t('Skip')" @click="skipSlide" name="skip"> <!-- <i class="fa fa-close fa-fw" aria-hidden="true"></i>--> X </button>
          <div class="label"  dir="ltr">
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
    console.log('SLIDES beforeCreate')
  },
  beforeMount () {
    console.log(JSON.stringify(this.getImages))
  },
  mounted () {
    var vm = this
    var imageCounter = parseInt(this.getImages.length)
    imageCounter *= this.autoplayTimout
    var slideCounter = parseInt(this.$store.getters.getCurrentSlides.slides.length)
    slideCounter *= this.autoplayTimout
    var autoTimeout = (imageCounter + slideCounter) || this.autoplayTimout
    console.log('TIMEOUT: ' + autoTimeout)
    setTimeout(() => {
      if (vm.$store.getters.getShowSlide) {
        vm.$events.emit('skipSlideEvent')
      }
    }, autoTimeout + 3000)
    console.log(JSON.stringify(this.getImages))
    console.log(JSON.stringify(this.$store.getters.getCurrentImages.slides))
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
      autoplayTimout: 2330
    }
  },
  computed: {
    getImages () {
      var api = this.$store.getters.getApiDB
      switch (api) {
        case 'mhs':
          return this.$store.getters.getAllImages.mhs
        case 'jva':
          return this.$store.getters.getAllImages.jva
        case 'iwth':
          return this.$store.getters.getAllImages.jva
        default:
          return this.$store.getters.getCurrentImages
      }
    },
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
  width: 200px;
}

.mobile-full-page .VueCarousel-slide {
  min-height: 500px;
}
.desktop-max .VueCarousel-slide {
  min-height: 400px;
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
.slider-image {
  height: 350px;
}
.slider-image img {
  top: 50%;
  left: 50%;
  width: 100%;
  border: 1px solid #000;
}
.skip-btn {
  position: absolute;
  padding: -1em;
  height: 2em;
  width: 2em;
  font-size: 1.2em;
  font-weight: bolder;
  right: 0;
  top: .2em;
  margin-bottom: -3em;
  margin-right: .1em;
  border-radius: 0;
  border: 0;
  z-index: 1000;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
