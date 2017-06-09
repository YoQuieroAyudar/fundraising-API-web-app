<template>
  <div class="go-to-box-area">

      <h3>{{$t(title)}}</h3>
      <p>{{message}}</p>
      <a class="btn btn-success btn-block" :href="url" target="_blank">{{$t(buttonText)}}</a>
      <a class="btn btn-danger btn-block" target="_blank" @click="$store.commit('setShowGoTo', false)">{{$t('Close')}}</a>


  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: 'Click below'
    },
    url: {
      type: String,
      default: '#'
    },
    buttonText: {
      type: String,
      default: 'Continue'
    }
  },
  data () {
    return {

    }
  },
  watch: {

  },
  methods: {

  },
  computed: {

  }
}
</script>
<style scoped>
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.6em;
}
h2{
  font-size: 1.45em;
}
h3{
  font-size: 1.3em;
}
h4 {
  font-size: 1.15em;
}
h5 {
  font-size: 1em;
}
.go-to-box-area {
  /*overflow-y: scroll;*/
  height: 100%;
}
</style>
