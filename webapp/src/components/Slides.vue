<template>
  <div class="slides-area">
    <button type="button" class="btn btn-primary btn-xs" @click="skipSlide" name="skip">{{$t('Skip')}}</button>

    <div class="wrapword">

      <carousel :autoplay="true" :autoplayTimeout="autoplayTimout" :autoplayHoverPause="true" :navigationEnabled="true" :perPage="1">
        <slide :style="slide.style" :key="index" v-for="(slide, index) in $store.getters.getCurrentSlides.slides">
          <p class="label"  dir="ltr">
            <p class="sentence" dir="ltr" v-for="text in seperatedSentences($t(slide.text))">{{text}}</p>
          </p>
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
    console.log('autoTimeout = ' + autoTimeout)
    setTimeout(() => {
      if (vm.$store.getters.getShowSlide) {
        vm.$events.emit('skipSlideEvent')
      }
    }, autoTimeout)
  },
  methods: {
    seperatedSentences (value) {
      console.log('seperatedSentences')
      if (!value) {
        return ''
      }
      value = value.toString().split('<br>')
      console.log('length: ' + value.length)
      return value
    },
    skipSlide (e) {
      e.preventDefault()
      console.log('skipping slide show')
      this.$events.emit('skipSlideEvent')
    }
  },
  data () {
    return {
      autoplayTimout: 5000
    }
  },
  computed: {

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
  padding-top: 10em;
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
.sentence {
  clear: both;
}
</style>
