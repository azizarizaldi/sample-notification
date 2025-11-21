self.addEventListener('install', () => {
  console.log('PWA SW Installed');
});

self.addEventListener('activate', () => {
  console.log('PWA SW Activated');
});
