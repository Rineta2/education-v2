import { NextResponse } from 'next/server';

import webpush from 'web-push';

import type { PushSubscriptionData, NotificationPayload } from '@/hooks/schema/notification/interface';

interface SendNotificationRequest {
    subscription: PushSubscriptionData;
    payload: NotificationPayload;
}

// Validasi VAPID keys
if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    throw new Error('VAPID keys must be set in environment variables');
}

const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
};

webpush.setVapidDetails(
    'mailto:rr8027896@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export async function POST(request: Request) {
    try {
        const { subscription, payload }: SendNotificationRequest = await request.json();

        await webpush.sendNotification(
            {
                endpoint: subscription.endpoint,
                keys: subscription.keys
            },
            JSON.stringify(payload)
        );

        return NextResponse.json({
            success: true,
            message: 'Notifikasi berhasil dikirim'
        });
    } catch (err) {
        console.error('Error sending notification:', err);
        return NextResponse.json({
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 });
    }
} 