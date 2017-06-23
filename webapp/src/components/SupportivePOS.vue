<template>
  <div>
    <div class="modal-wrapper">
      <div class="modal-inner">
        <vodal :show="showAddPosModal" :width="250" :height="300" animation="rotate" @hide="showAddPosModal = false">
            <div class="notice-box">
              <p>
                {{notice}}
              </p>
              <br>
              <div class="row">
                <div class="col-xs-6">
                  <a class="btn btn-warning" @click="logoutAll" :href="registerPosUrl">Logout</a>
                </div>
                <div class="col-xs-6">
                  <button class="btn btn-info" @click="showAddPosModal = false" type="button" name="button">Cancel</button>
                </div>
              </div>
            </div>
        </vodal>
      </div>
    </div>

    <div class="share-button">
      <button :class="$i18n.locale() == 'ar' ? 'btn btn-success btn-xs pull-left' : 'btn btn-success btn-xs pull-right'" type='button' @click="$store.commit('setShowShare', true)">{{$t('Share')}}</button>
      <button :class="$i18n.locale() == 'ar' ? 'btn btn-success pull-left add-pos-btn' : 'btn btn-success pull-right add-pos-btn'" type="button" @click="showAddPosModal = true" :title="$t('Add Supportive Establishment')" name="button">+</button>
    </div>

    <h4 class="page-top-title">{{ $t('Supportive Establishments') }}</h4>

    <g-map-window></g-map-window>

  </div>

</template>

<script>
import Map from './Map.vue'

export default {
  data () {
    return {
      showAddPosModal: false,
      notice: 'Are you sure to logout and register new establishment?'
    }
  },
  methods: {
    logoutAll (e) {
      this.$store.getters.getFBAuthorized ? this.$events.emit('logoutFBEvent') : this.$events.emit('logoutEvent')
      return true
    }
  },
  computed: {
    registerPosUrl () {
      var url = '/?pos-signup=true'
      return url
    }
  },
  components: {
    'g-map-window': Map
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
.add-pos-btn {
  border-radius: 50%;
  position: absolute;
  top: 4em;
  right: .1em;
  z-index: 1000;
  font-size: 1.4em;
  font-weight: bolder;
  padding: .3em;
  padding-left: .7em;
  padding-right: .7em;
  box-shadow: 0 0 10px #444;
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
.notice-box {
  width: 80%;
  margin: auto;
  margin-top: 25%;
}
.notice-box btn {
  width: 10em;
}
.modal-wrapper {
  position: relative;
  z-index: 1001;
}
</style>
