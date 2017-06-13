var CACHE_NAME = 'flappypwa-v4'
var urlsToCache = [
  '/index.html',
  '/css/main.css',
  '/css/reset.css',
  '/js/jquery.transit.min.js',
  '/js/buzz.min.js',
  '/js/main.js',
  '/js/jquery.min.js',
  '/assets/bird.png',
  '/assets/font_small_3.png',
  '/assets/font_small_6.png',
  '/assets/font_small_5.png',
  '/assets/font_small_7.png',
  '/assets/font_small_2.png',
  '/assets/font_small_0.png',
  '/assets/font_small_9.png',
  '/assets/font_small_1.png',
  '/assets/font_small_4.png',
  '/assets/font_big_0.png',
  '/assets/font_big_3.png',
  '/assets/font_big_8.png',
  '/assets/font_big_9.png',
  '/assets/font_big_2.png',
  '/assets/font_big_5.png',
  '/assets/font_big_6.png',
  '/assets/font_big_1.png',
  '/assets/font_big_7.png',
  '/assets/font_big_4.png',
  '/assets/pipe.png',
  '/assets/pipe.png',
  '/assets/land.png',
  '/assets/bird.png',
  '/assets/medal_gold.png',
  '/assets/medal_platinum.png',
  '/assets/medal_silver.png',
  '/assets/medal_bronze.png',
  '/assets/pipe-up.png',
  '/assets/pipe-down.png',
  '/assets/replay.png',
  '/assets/splash.png',
  '/assets/scoreboard.png',
  '/assets/sky.png',
  '/assets/thumb.png',
  '/assets/sounds/sfx_wing.ogg',
  '/assets/sounds/sfx_point.ogg',
  '/assets/sounds/sfx_swooshing.ogg',
  '/assets/sounds/sfx_hit.ogg',
  '/assets/sounds/sfx_die.ogg'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone()

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        )
      })
    )
})
