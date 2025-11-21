<template>
  <div class="text-center">
    <h1>FCM PWA Vue 3 - Sample Notification</h1>
    <button @click="requestPermission">Enable Notifications</button>
    <div v-if="token">
      <p>Token: {{ token }}</p>
      <button type="button" @click="copyToken">Copy Token</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBRhEpMvoAk1S8ntibm9l_okJ4lk2INCAc",
  authDomain: "griya-belajar-parent-app.firebaseapp.com",
  projectId: "griya-belajar-parent-app",
  storageBucket: "griya-belajar-parent-app.firebasestorage.app",
  messagingSenderId: "819561720384",
  appId: "1:819561720384:web:2a8cdf6830dc3b37f34da5",
  measurementId: "G-2KHT350CGD"
};

const app = initializeApp(firebaseConfig);

export default {
  setup() {
    const token = ref(null);
    let messaging = null;

    onMounted(async () => {
      // Pastikan browser support FCM
      const supported = await isSupported();

      if (!supported) {
        console.warn("Browser tidak support Firebase Messaging");
        return;
      }

      // Inisialisasi messaging hanya ketika browser sudah support
      messaging = getMessaging(app);

      // Handle message foreground
      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        alert(`Notification: ${payload.notification.title}`);
      });
    });

    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        if (!messaging) {
          console.warn("Messaging belum siap");
          return;
        }

        const currentToken = await getToken(messaging, {
          vapidKey: "BBeU2kXd-f0SXfLncd270pWEJ995j-HzL2nWKAXO59IxnngHKSuaMjygcwAwNtzBuaa0uqKLuDoV-Iyy1jNBusw"
        });

        if (currentToken) {
          token.value = currentToken;
          console.log("FCM Token:", currentToken);
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    const copyToken = async () => {
      try {
        await navigator.clipboard.writeText(token.value);
        alert("Token copied!");
      } catch (error) {
        console.error("Error copying token:", error);
      }
    };

    return {
      token,
      requestPermission,
      copyToken
    };
  },
  methods: {
    copyToken: function(token) {
      navigator.clipboard.writeText(token).then(function() {
        alert('Token copied to clipboard!');
      }, function(err) {
        console.error('Could not copy text: ', err);
      });
    }
  },
};
</script>
