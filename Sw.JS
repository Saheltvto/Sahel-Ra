// Service Worker حداقلی برای «حسابداری هوشمند ساحل - نسخه رفعتی»
// فقط شِل صفحه رو کش می‌کند تا معیار نصب واقعی (WebAPK) برآورده شود.
// کاری با درخواست‌های داخل iframe (اسکریپت گوگل) ندارد.

const CACHE_NAME = 'sahel-rafati-shell-v2';
const SHELL_FILES = [
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match('./index.html'))
  );
});
