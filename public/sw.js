const CACHE_NAME = 'mysoko-v1'
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
]

// Install event - cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[v0] Service Worker installing, caching essential assets')
      return cache.addAll(URLS_TO_CACHE).catch(err => {
        console.log('[v0] Cache addAll error:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[v0] Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - network first for API, cache first for assets
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // API calls - network first with fallback to cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clonedResponse = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clonedResponse)
          })
          return response
        })
        .catch(() => {
          return caches.match(request).then(response => {
            if (response) {
              return response
            }
            // Return a basic offline response for API calls
            return new Response(
              JSON.stringify({ message: 'You are offline. This data may be cached.' }),
              { headers: { 'Content-Type': 'application/json' } }
            )
          })
        })
    )
    return
  }

  // Static assets - cache first
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/)
  ) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response
        }
        return fetch(request).then(response => {
          const clonedResponse = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clonedResponse)
          })
          return response
        })
      })
    )
    return
  }

  // HTML pages - network first
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clonedResponse = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, clonedResponse)
          })
          return response
        })
        .catch(() => {
          return caches.match(request).then(response => {
            if (response) {
              return response
            }
            // Return offline page
            return caches.match('/') || new Response('Page not available offline')
          })
        })
    )
  }
})

// Background sync for offline actions (future use)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-loans') {
    console.log('[v0] Syncing loan applications')
  }
})
