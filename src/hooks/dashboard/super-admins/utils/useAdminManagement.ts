import { useState } from 'react'

import { doc, setDoc, deleteDoc } from 'firebase/firestore'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth, db } from '@/utils/firebase'

import { Admin, AdminFormData } from '@/hooks/schema/super-admins/admin/Interface'

import toast from 'react-hot-toast'

export const useAdminManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const [formData, setFormData] = useState<AdminFormData>({
        email: '',
        password: '',
        namaLengkap: '',
        isActive: true
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [adminToDelete, setAdminToDelete] = useState<string | null>(null)

    const handleEdit = (admin: Admin) => {
        if (!admin) return

        setSelectedAdmin(admin)
        setFormData({
            email: admin.email,
            namaLengkap: admin.namaLengkap,
            password: '',
            isActive: admin.isActive
        })
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedAdmin(null)
        setFormData({ email: '', password: '', namaLengkap: '', isActive: true })
        setError('')
    }

    const handleDelete = (adminId: string) => {
        setAdminToDelete(adminId)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!adminToDelete) return

        try {
            const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS
            if (!collectionPath) {
                throw new Error('Collection path is not defined')
            }

            const docRef = doc(db, collectionPath, adminToDelete)
            await deleteDoc(docRef)
            toast.success('Admin berhasil dihapus!')
            setIsDeleteModalOpen(false)
            setAdminToDelete(null)
        } catch (error) {
            console.error('Error menghapus admin:', error)
            toast.error('Gagal menghapus admin')
            setError('Gagal menghapus admin')
        }
    }

    const cancelDelete = () => {
        setIsDeleteModalOpen(false)
        setAdminToDelete(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            if (selectedAdmin) {
                // Update existing admin
                const adminData = {
                    email: formData.email,
                    namaLengkap: formData.namaLengkap,
                    isActive: formData.isActive,
                    updatedAt: new Date().toISOString()
                }

                const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS
                if (!collectionPath) {
                    throw new Error('Collection path is not defined')
                }

                const docRef = doc(db, collectionPath, selectedAdmin.userId)
                await setDoc(docRef, adminData, { merge: true })
                toast.success('Admin berhasil diperbarui!')
                handleCloseModal()
            } else {
                // Create new admin
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                const user = userCredential.user

                const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS
                if (!collectionPath) {
                    throw new Error('Collection path is not defined')
                }

                const adminData: Admin = {
                    userId: user.uid,
                    email: formData.email,
                    namaLengkap: formData.namaLengkap,
                    role: process.env.NEXT_PUBLIC_ROLE_ADMIN as string,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: formData.isActive
                }

                const docRef = doc(db, collectionPath, user.uid)
                await setDoc(docRef, adminData)
                toast.success('Admin baru berhasil ditambahkan!')
                handleCloseModal()
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`)
                setError(error.message)
            } else {
                toast.error('Terjadi kesalahan yang tidak diketahui')
                setError('Terjadi kesalahan yang tidak diketahui')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'isActive' ? value === 'true' : value
        }))
    }

    return {
        isModalOpen,
        setIsModalOpen,
        selectedAdmin,
        formData,
        error,
        isSubmitting,
        isDeleteModalOpen,
        adminToDelete,
        handleEdit,
        handleCloseModal,
        handleDelete,
        confirmDelete,
        cancelDelete,
        handleSubmit,
        handleChange
    }
}