import { NextResponse } from 'next/server';

import webpush from 'web-push';

import type { PushSubscriptionData, NotificationPayload } from '@/hooks/schema/notification/interface';

interface SendNotificationRequest {
    subscription: PushSubscriptionData;
    payload: NotificationPayload;
}

// Tambahkan logging untuk debug
const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '',
    privateKey: process.env.VAPID_PRIVATE_KEY ?? ''
};

// Logging untuk memastikan VAPID keys ada
console.log('VAPID Public Key exists:', !!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
console.log('VAPID Private Key exists:', !!process.env.VAPID_PRIVATE_KEY);

// Validasi VAPID keys
if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
    throw new Error('VAPID keys must be set in environment variables');
}

webpush.setVapidDetails(
    'mailto:rr8027896@gmail.com', // Pastikan email ini sesuai dengan yang didaftarkan
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export async function POST(request: Request) {
    try {
        const { subscription, payload }: SendNotificationRequest = await request.json();

        // Tambahkan logging untuk debug
        console.log('Received subscription:', subscription);
        console.log('Received payload:', payload);

        // Validasi subscription
        if (!subscription?.endpoint || !subscription?.keys?.auth || !subscription?.keys?.p256dh) {
            throw new Error('Invalid subscription object');
        }

        const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
                auth: subscription.keys.auth,
                p256dh: subscription.keys.p256dh
            }
        };

        await webpush.sendNotification(
            pushSubscription,
            JSON.stringify(payload)
        );

        return NextResponse.json({
            success: true,
            message: 'Notifikasi berhasil dikirim'
        });
    } catch (err) {
        console.error('Error sending notification:', err);
        // Tambahkan detail error lebih spesifik
        const errorMessage = err instanceof Error ?
            `${err.name}: ${err.message}` :
            'Unknown error occurred';

        return NextResponse.json({
            success: false,
            error: errorMessage,
            details: err
        }, { status: 500 });
    }
} 