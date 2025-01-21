/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

// Definisikan tipe untuk data notifikasi
interface NotificationData {
    url?: string;
    id?: string | number;
    type?: string;
    [key: string]: string | number | undefined;
}

// Definisikan interface yang benar untuk options
interface PushNotificationOptions extends Omit<NotificationOptions, 'data'> {
    body?: string;
    icon?: string;
    badge?: string;
    data?: NotificationData;
}

// Di awal file
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    console.error("VAPID public key is not set");
}

// Mendengarkan event push dari server
self.addEventListener("push", (event: PushEvent) => {
    console.log('Push event received:', event);

    try {
        const payload = event.data?.text();
        console.log('Push payload:', payload);

        const options: PushNotificationOptions = {
            body: payload ?? 'No payload',
            icon: '/icon.png',
            badge: '/badge.png',
        };

        event.waitUntil(
            self.registration.showNotification('Notification Title', options)
                .then(() => console.log('Notification shown successfully'))
                .catch(error => console.error('Error showing notification:', error))
        );
    } catch (error) {
        console.error('Error in push event handler:', error);
    }
});

// Menangani klik pada notifikasi
self.addEventListener("notificationclick", (event: NotificationEvent) => {
    console.log("Notification clicked:", event.action);

    event.notification.close();

    if (event.action === "open") {
        event.waitUntil(self.clients.openWindow("/"));
    }
});

export { }; 