/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

// Di awal file
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    console.error("VAPID public key is not set");
}

interface PushData {
    message: string;
}

interface ExtendedNotificationOptions extends NotificationOptions {
    vibrate?: number[];
    actions?: {
        action: string;
        title: string;
    }[];
}

// Mendengarkan event push dari server
self.addEventListener("push", (event: PushEvent) => {
    if (!event.data) return;

    console.log("Push received:", event.data.json());

    // Data yang diterima dari server
    const data = event.data.json() as PushData;

    // Konfigurasi notifikasi
    const options: ExtendedNotificationOptions = {
        body: data.message,
        icon: "/icon.png",
        badge: "/badge.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: "1",
        },
        actions: [
            {
                action: "open",
                title: "Buka Aplikasi",
            },
            {
                action: "close",
                title: "Tutup",
            },
        ],
    };

    console.log("Showing notification with options:", options);

    // Menampilkan notifikasi
    event.waitUntil(self.registration.showNotification("Admin Panel", options));
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