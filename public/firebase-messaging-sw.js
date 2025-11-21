importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRhEpMvoAk1S8ntibm9l_okJ4lk2INCAc",
    authDomain: "griya-belajar-parent-app.firebaseapp.com",
    projectId: "griya-belajar-parent-app",
    storageBucket: "griya-belajar-parent-app.firebasestorage.app",
    messagingSenderId: "819561720384",
    appId: "1:819561720384:web:2a8cdf6830dc3b37f34da5",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification.title || 'New Notification';
    const notificationOptions = {
        body: payload.notification.body || 'You have a new message',
        icon: payload.notification.icon || '/firebase-logo.png',
        badge: '/badge-icon.png',
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data?.url || '/')
    );
});
