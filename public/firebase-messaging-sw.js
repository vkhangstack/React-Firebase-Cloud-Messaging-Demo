/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    data: payload.data,
    icon: payload.data.image || payload.data?.imageUrl,
    image: payload.data.image || payload.data?.imageUrl,
    messageId: payload.data.messageId,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// Handle when user clicks on notification
self.addEventListener("notificationclick", function (event) {
  // Close the notification to prevent duplicate interactions
  event.notification.close()

  // Extract the click_action URL from notification data
  const clickAction = event.notification.data?.click_action || "/"

  // Redirect to the URL or focus an existing client
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (let client of clientList) {
          if (client.url === clickAction && "focus" in client) {
            return client.focus() // Focus on the tab if already open
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(clickAction) // Open a new tab if not already open
        }
      })
      .catch((error) => {
        console.error("Error handling notification click:", error)
      })
  )
})
