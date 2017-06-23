import Q from 'q'
import axios from 'axios'
var GMKEY = 'AIzaSyB16sGmIekuGIvYOfNoW9T44377IU2d2Es'
var GMBASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
function getCoordinates (address) {
  address = address.replace(' ', '+')
  var url = GMBASE_URL + '?address=' + encodeURIComponent(address) + '&key=' + GMKEY
  var deferred = Q.defer()
  axios({
    method: 'GET',
    url: url
  }).then(resp => {
    console.log('raw response')
    console.log(resp)
    if (resp.data === undefined && resp.data.results === undefined && resp.data.results[0] === undefined) {
      deferred.resolve(resp)
    } else {
      deferred.resolve(resp.data.results[0])
    }
  }).catch(err => {
    deferred.reject(err)
  })

  return deferred.promise
}
function getCenter (country) {
  var lat = 40.4167578
  var long = -3.7059379

  switch (country) {
    case 'fr':
      lat = 46.613326
      long = 2.206351
      break
    case 'be':
      lat = 50.579488
      long = 4.459974
      break
    case 'tn':
      lat = 34.110093
      long = 9.613839
      break
    case 'ch':
      lat = 46.931645
      long = 8.207400
      break
    case 'ma':
      lat = 32.014581
      long = -6.477707
      break
    default:
      break
  }
  return {lat: lat, lng: long}
}

function getMarkers (establishments) {
  if (establishments === undefined || establishments.length < 1) {
    return null
  }
  var markers = []
  for (var i = 0; i < establishments.length; i++) {
    var marker = {
      position: { lat: 0, lng: 0 },
      infoText: 'Marker'
    }
    marker.position.lat = establishments[i].geo_y
    marker.position.lng = establishments[i].geo_x
    marker.infoText = establishments[i].name

    markers.push(marker)
  }
  return markers
}

export default {
  getCoordinates,
  getCenter,
  getMarkers
}
