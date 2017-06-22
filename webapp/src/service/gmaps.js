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
  getCenter,
  getMarkers
}
