export interface PushSubscriptionKeys {
    p256dh: string;
    auth: string;
}

export interface PushSubscriptionData {
    endpoint: string;
    keys: PushSubscriptionKeys;
    expirationTime?: number | null;
}

export interface NotificationData {
    url?: string;
    timestamp?: string;
    [key: string]: string | undefined; // Untuk data tambahan yang mungkin diperlukan
}

export interface NotificationPayload {
    title: string;
    body: string;
    icon?: string;
    data?: NotificationData;
    url?: string;
}