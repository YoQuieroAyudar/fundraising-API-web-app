<template>
  <div>
    <h1>{{currentPOS.name}}</h1>

    <span class="hidden">{{getMapCenter}}:{{getMarkers}}</span>

    <div v-if="markers.length > 0" class="map1">
      <gmap-map
        :center="center"
        :zoom="7"
        style="width: 500px; height: 300px"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          
        ></gmap-marker>
      </gmap-map>
    </div>

    <div v-else class="map2">
      <gmap-map
        :center="center"
        :zoom="6"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      ></gmap-map>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      center: {lat: 0.0, lng: 0.0},
      markers: [{
        position: {lat: 10.0, lng: 10.0}
      }]
    }
  },
  methods: {
    getCountryLocation (countryCode) {
      var location = {}
      if (countryCode === 'FR') {
        location.lat = 48
        location.lng = 2 // {lat: 48.86, lng: 2.35}
        return location
      } else {
        location.lat = 40
        location.lng = -3 // {lat: 40.42, lng: -3.7}
        return location
      }
    }
  },
  computed: {
    currentPOS () {
      return this.$store.getters.getEstablishment
    },
    getMapCenter () {
      // retuns long and lat of the POS
      var long, lat
      if (this.currentPOS.geo_x === 0 && this.currentPOS.geo_y === 0) {
        var countryLocation = this.getCountryLocation(this.currentPOS.country)
        long = countryLocation.long
        lat = countryLocation.lat
      } else {
        long = this.currentPOS.geo_x
        lat = this.currentPOS.geo_y
      }
      this.center.lat = lat
      this.center.lng = long // {lng: long, lat: lat}
      this.markers = {position: this.center}
      return this.center
    },
    getMarkers () {
      this.markers = [{position: this.center}]
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
</style>
