const CACHE_NAME = 'school-id-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/assets/js/header.js',
  '/assets/js/html2canvas.min.js',
  '/assets/images/logo.png',
  '/assets/images/male.svg',
  '/assets/images/female.svg',
  '/assets/css/all.css',
  '/assets/webfonts/fa-v4compatibility.woff2',
  '/assets/webfonts/fa-v4compatibility.ttf',
  '/assets/webfonts/fa-solid-900.woff2',
  '/assets/webfonts/fa-solid-900.ttf',
  '/assets/webfonts/fa-regular-400.woff2',
  '/assets/webfonts/fa-regular-400.ttf',
  '/assets/webfonts/fa-brands-400.woff2',
  '/assets/webfonts/fa-brands-400.ttf',
  '/assets/template/female-template.png',
  '/assets/template/male-template.png',
  '/assets/fonts/NotoKufiArabic-VariableFont_wght.woff2'
];

// تثبيت وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .then(() => self.skipWaiting())
  );
});

// تنظيف الكاش القديم وتفعيل السيطرة على الصفحات
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// اعتراض كل الطلبات والاعتماد على الكاش فقط
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // يرجع من الكاش مباشرة
        return cachedResponse;
      } else {
        // لو الطلب غير موجود في الكاش، يرجع الصفحة الرئيسية من الكاش كاحتياط
        return caches.match('/index.html');
      }
    })
  );
});