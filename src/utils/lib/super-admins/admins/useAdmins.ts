import { useState, useEffect } from 'react'

import { collection, onSnapshot, query, where } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Admin } from '@/hooks/schema/super-admins/admin/Interface'

interface UseAdminsReturn {
    admins: Admin[];
    isLoading: boolean;
}

export function useAdmins(): UseAdminsReturn {
    const [admins, setAdmins] = useState<Admin[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true) // Set loading saat memulai fetch

        const adminsQuery = query(
            collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
            where('role', '==', process.env.NEXT_PUBLIC_ROLE_ADMIN as string)
        )

        const unsubscribe = onSnapshot(adminsQuery,
            (snapshot) => {
                const adminsData = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    userId: doc.id,
                    createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
                })) as Admin[]

                setAdmins(adminsData)
                setIsLoading(false)
            },
            (error) => {
                console.error('Error fetching admins:', error)
                setIsLoading(false)
                setAdmins([]) // Reset admins jika error
            }
        )

        return () => unsubscribe()
    }, [])

    // Hanya return dummy data jika benar-benar loading
    return {
        admins: admins,
        isLoading
    }
}