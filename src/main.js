import { createApp } from 'vue'
import App from './App.vue'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // register SW PWA
      const reg1 = await navigator.serviceWorker.register('/sw.js');
      console.log('PWA SW registered', reg1);

      // register SW Firebase
      const reg2 = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Firebase SW registered', reg2);

    } catch (e) {
      console.error('SW registration failed', e);
    }
  });
}

createApp(App).mount('#app')
