<template>
  <div>
    <div>
      <div class="share-button">
        <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
      </div>

      <h2>{{$t('Solidarity Account')}}</h2>
    </div>
    <div>
      <recharge-account-page></recharge-account-page>
    </div>
  </div>

</template>

<script>
import Recharge from './Recharge.vue'
export default {
  methods: {

  },
  components: {
    'recharge-account-page': Recharge
  }
}
</script>
<style scoped>
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.45em;
}
h2{
  font-size: 1.3em;
}
h3{
  font-size: 1.15em;
}
h4 {
  font-size: 1em;
}
h5 {
  font-size: 0.95em;
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
.page-top-title {
  width: 75%;
  border: 1px solid #EFE;
  padding: .1em;
}
</style>
