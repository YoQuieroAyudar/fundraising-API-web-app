var CACHE = 'network-or-cache'

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.')
  evt.waitUntil(precache())
})

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.')
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request)
  }))
})

function precache () {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      '/index.html',
      '/launcher-icon-96.png',
      '/launcher-icon-144.png',
      '/launcher-icon-192.png',
      '/launcher-icon-256.png',
      '/powered-by-mangopay.png',
      '/slide-img-es.png',
      '/slide-img-fr.png',
      '/app.js'
    ])
  })
}

function fromNetwork (request, timeout) {
  return new Promise(function (resolve, reject) {
    var timeoutId = setTimeout(reject, timeout)
    fetch(request).then(function (response) {
      clearTimeout(timeoutId)
      resolve(response)
    }, reject)
  })
}

function fromCache (request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match')
    })
  })
}
