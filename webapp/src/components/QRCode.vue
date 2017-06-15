<template>
  <div class="qr-code-area">
    <div v-if="qrCodeImage" class="rotate90degrees qr-code-img">
      <img class="" :src="qrCodeImage" :alt="$t('Your QR Code')" :title="$t('Your QR Code')">
    </div>
    <div v-else class="">
      <p>{{$t('Sorry, no QR code image found')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    qrCodeImage () {
      return this.$store.getters.getPOSQRCode
    }
  },
  beforeMount () {
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
.rotate90degrees {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.qr-code-img {
  margin: auto;
  width: 100%;
}
.qr-code-img img {
  position: relative;
  height: 15em;
  margin-left: 2em;
}
.clear {
  clear:both;
}
</style>
