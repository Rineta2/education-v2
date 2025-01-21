// Di awal file
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
  console.error("VAPID public key is not set");
}

// Mendengarkan event push dari server
self.addEventListener("push", function (event) {
  console.log("Push received:", event.data.json());

  // Data yang diterima dari server
  const data = event.data.json();

  // Konfigurasi notifikasi
  const options = {
    body: data.message,
    icon: "/icon.png",
    badge: "/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    // Tambahkan actions untuk interaksi lebih
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
self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked:", event.action);

  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"));
  }
});
