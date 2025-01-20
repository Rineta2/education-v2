import { db } from '@/utils/firebase'

import { collection, getDocs } from 'firebase/firestore'

import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const collectionName = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS
        if (!collectionName) {
            throw new Error('NEXT_PUBLIC_COLLECTIONS_ACCOUNTS environment variable is not defined')
        }

        const querySnapshot = await getDocs(collection(db, collectionName))

        const accounts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json({ accounts })
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch accounts' },
            { status: 500 }
        )
    }
} 