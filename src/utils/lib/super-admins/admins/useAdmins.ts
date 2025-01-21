import { useState, useEffect } from 'react'

import { collection, onSnapshot, query } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Admin } from '@/hooks/schema/super-admins/admin/Interface'

export const useAdmins = () => {
    const [admins, setAdmins] = useState<Admin[]>([])

    useEffect(() => {
        const adminsQuery = query(collection(db, 'accounts'))

        // Set up real-time listener
        const unsubscribe = onSnapshot(adminsQuery, (snapshot) => {
            const adminsList = snapshot.docs
                .map(doc => {
                    const data = doc.data()
                    return {
                        userId: doc.id,
                        email: data.email,
                        namaLengkap: data.namaLengkap,
                        role: data.role,
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        isActive: data.isActive
                    } as Admin
                })
                .filter(admin => admin.role === 'admins')

            setAdmins(adminsList)
        })

        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    return { admins }
}