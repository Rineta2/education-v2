"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import axios from 'axios'

interface Account {
  id: string;
  agama: string;
  alamat: string;
  createdAt: string;
  email: string;
  ipk: string;
  isActive: boolean;
  jenisKelamin: string;
  jurusan: string;
  lastLogin: string;
  mataPelajaran: string;
  namaLengkap: string;
  profilePicture: string;
  role: string;
  tanggalLahir: string;
  telepon: string;
  tempatLahir: string;
  tingkatan: string;
  universitas: string;
  userId: string;
}

export default function Page() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch menggunakan axios
    const fetchInitialData = async () => {
      try {
        const { data } = await axios.get('/api/accounts')
        setAccounts(data.accounts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching initial data:', error)
        setLoading(false)
      }
    }

    fetchInitialData()

    // Realtime listener
    const unsubscribe = onSnapshot(collection(db, 'accounts'), (snapshot) => {
      try {
        const accountsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Account, 'id'>)
        }))
        setAccounts(accountsData)
      } catch (error) {
        console.error('Error in realtime listener:', error)
      }
    })

    // Cleanup listener
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Accounts Data</h1>
      <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  )
}
