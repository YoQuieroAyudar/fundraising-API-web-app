<template>
  <div>
    <div class="share-button">
      <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
    </div>
    <h1>{{$t('My Donations')}}</h1>
    <label class="label label-warning">{{ $t('Page is under-construction') }}</label>
    <br>

  </div>
</template>

<script>
export default {
  methods: {
    goToRechargePage (e) {
      e.preventDefault()
      this.$store.commit('resetMessages')
      // this.$store.commit('setCurrentPage', 'recharge')
      this.$events.emit('goToPageEvent', 'recharge')
    }
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
.share-button {
  position: absolute;
  left: 0;
  right: 1.7em;
  margin-top: 0;
}
.pull-left {
  left: 0;
  margin-left: 2em;
}
</style>
