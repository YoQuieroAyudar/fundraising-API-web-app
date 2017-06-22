<template>
  <div>

    <gmap-map :center="center" :zoom="10" style="width: 100%; height: 405px">
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>

        <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>

    </gmap-map>

  </div>
</template>

<script>

import GM from '../service/gmaps'

export default {
  beforeMount () {
    var country = this.$store.getters.getSelectedCountry
    this.center = GM.getCenter(country.toLowerCase())

    var establishments = this.$store.getters.getUserEstablishments
    console.log('establishments')
    console.log(establishments)
    var allMarkers = GM.getMarkers(establishments)
    console.log('allMarkers')
    console.log(allMarkers)
    if (allMarkers.length > 0) {
      this.markers = allMarkers
      this.$gmapDefaultResizeBus.$emit('resize')
    }
  },
  data () {
    return {
      center: {
        lat: 47.376332,
        lng: 8.547511
      },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      newMarkers: [],
      markers: [{
        position: {
          lat: 47.376332,
          lng: 8.547511
        },
        infoText: 'Marker 1'
      }, {
        position: {
          lat: 47.374592,
          lng: 8.548867
        },
        infoText: 'Marker 2'
      }, {
        position: {
          lat: 47.379592,
          lng: 8.549867
        },
        infoText: 'Marker 3'
      }]
    }
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else { // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },
  computed: {
  }
}
</script>
<style scoped>

</style>
