export const useNotification = () => {
    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            return false;
        }

        if (!('serviceWorker' in navigator)) {
            return false;
        }

        if (Notification.permission === 'granted') {
            return true;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    };

    const subscribeToNotifications = async () => {
        try {
            const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!publicVapidKey) {
                throw new Error('VAPID Public Key tidak tersedia');
            }

            const registration = await navigator.serviceWorker.register('/sw.js');
            await navigator.serviceWorker.ready;

            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });
            }

            await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription)
            });

            return true;
        } catch {
            return false;
        }
    };

    const checkNotificationStatus = async () => {
        if (!('Notification' in window)) {
            return { supported: false };
        }

        if (!('serviceWorker' in navigator)) {
            return { supported: false };
        }

        const registration = await navigator.serviceWorker.getRegistration();
        let subscription = null;
        if (registration) {
            subscription = await registration.pushManager.getSubscription();
        }

        return {
            supported: true,
            permission: Notification.permission,
            serviceWorkerRegistered: !!registration,
            subscriptionActive: !!subscription
        };
    };

    const resetNotificationPermission = async () => {
        try {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    await subscription.unsubscribe();
                }
            }

            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }

            return true;
        } catch {
            return false;
        }
    };

    return {
        requestPermission,
        subscribeToNotifications,
        checkNotificationStatus,
        resetNotificationPermission
    };
}; 