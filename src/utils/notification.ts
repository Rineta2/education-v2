import { db } from '@/utils/firebase';

import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

import type { PushSubscriptionData, NotificationPayload } from '@/hooks/schema/notification/interface';

export const saveSubscription = async (subscription: PushSubscriptionData) => {
    try {
        // Cek apakah subscription dengan endpoint yang sama sudah ada
        const subscriptionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PUSH_SUBSCRIPTIONS!);
        const q = query(subscriptionsRef, where('endpoint', '==', subscription.endpoint));
        const querySnapshot = await getDocs(q);

        // Jika belum ada, simpan subscription baru
        if (querySnapshot.empty) {
            const docRef = await addDoc(subscriptionsRef, {
                ...subscription,
                createdAt: new Date().toISOString(),
                lastUsed: new Date().toISOString()
            });
            console.log('Subscription saved with ID:', docRef.id);
            return docRef.id;
        } else {
            console.log('Subscription already exists');
            return querySnapshot.docs[0].id;
        }
    } catch (error) {
        console.error('Error saving subscription:', error);
        throw error;
    }
};

export const removeSubscription = async (endpoint: string) => {
    try {
        const subscriptionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PUSH_SUBSCRIPTIONS!);
        const q = query(subscriptionsRef, where('endpoint', '==', endpoint));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PUSH_SUBSCRIPTIONS!, querySnapshot.docs[0].id));
            console.log('Subscription removed');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error removing subscription:', error);
        throw error;
    }
};

export const getAllSubscriptions = async () => {
    try {
        const subscriptionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PUSH_SUBSCRIPTIONS!);
        const querySnapshot = await getDocs(subscriptionsRef);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as (PushSubscriptionData & { id: string })[];
    } catch (error) {
        console.error('Error getting subscriptions:', error);
        throw error;
    }
};

export const sendNotification = async (subscription: PushSubscriptionData, payload: NotificationPayload) => {
    try {
        const response = await fetch('/api/notifications/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription,
                payload
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};