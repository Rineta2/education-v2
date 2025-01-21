import { NextResponse } from 'next/server';

import { db } from '@/utils/firebase';

import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

import type { PushSubscriptionData } from '@/hooks/schema/notification/interface';

export async function POST(request: Request) {
    try {
        const subscription: PushSubscriptionData = await request.json();

        // Cek duplikat subscription
        const subscriptionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PUSH_SUBSCRIPTIONS!);
        const q = query(subscriptionsRef, where('endpoint', '==', subscription.endpoint));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // Simpan subscription baru
            const docRef = await addDoc(subscriptionsRef, {
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                expirationTime: subscription.expirationTime,
                createdAt: new Date().toISOString(),
                lastUsed: new Date().toISOString()
            });

            return NextResponse.json({
                success: true,
                message: 'Subscription berhasil disimpan',
                subscriptionId: docRef.id
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription sudah ada',
            subscriptionId: querySnapshot.docs[0].id
        });

    } catch (err) {
        console.error('Error saving subscription:', err);
        return NextResponse.json({
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 });
    }
} 