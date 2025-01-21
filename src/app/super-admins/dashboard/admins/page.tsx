'use client'

import React, { useState } from 'react'

import { doc, setDoc, deleteDoc } from 'firebase/firestore'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/utils/firebase'

import { db } from '@/utils/firebase'

import { Admin, AdminFormData } from '@/hooks/schema/super-admins/admin/Interface'

import Image from 'next/image'

import DeleteIcon from '../../../../../public/dashboard/delete.png'

import { useAdmins } from '@/utils/lib/super-admins/admins/useAdmins'

export default function Admins() {
    const { admins } = useAdmins()
    const [searchTerm, setSearchTerm] = useState('')
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

    const filteredAdmins = admins.filter(admin =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEdit = (adminId: string) => {
        const admin = admins.find(a => a.userId === adminId)
        if (admin) {
            setSelectedAdmin(admin)
            setFormData({
                email: admin.email,
                namaLengkap: admin.namaLengkap,
                password: '',
                isActive: admin.isActive
            })
            setIsModalOpen(true)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedAdmin(null)
        setFormData({ email: '', password: '', namaLengkap: '', isActive: true })
        setError('')
    }

    const handleDelete = async (adminId: string) => {
        setAdminToDelete(adminId)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!adminToDelete) return

        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ACCOUNTS as string, adminToDelete))
            setIsDeleteModalOpen(false)
            setAdminToDelete(null)
        } catch (error) {
            console.error('Error menghapus admin:', error)
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

                await setDoc(doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ACCOUNTS as string, selectedAdmin.userId), adminData, { merge: true })

                handleCloseModal()
            } else {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                const user = userCredential.user

                const adminData: Admin = {
                    userId: user.uid,
                    email: formData.email,
                    namaLengkap: formData.namaLengkap,
                    role: process.env.NEXT_PUBLIC_ROLE_ADMIN as string,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isActive: formData.isActive
                }

                await setDoc(doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_ACCOUNTS as string, user.uid), adminData, { merge: true })
                handleCloseModal()
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
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

    return (
        <section className="min-h-screen min-w-full bg-gray-50 p-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-[24px] font-semibold text-title">Daftar Admin</h1>
                        <p className="mt-2 text-[14px] text-text">
                            Kelola semua admin dalam sistem
                        </p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-[14px] font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Tambah Admin
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari admin..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none bg-background focus:ring-2 focus:ring-primary/20 focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Nama Lengkap
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Status
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Tanggal Dibuat
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAdmins.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                            Tidak ada data admin yang ditemukan
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAdmins.map((admin) => (
                                        <tr key={admin.email} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] font-medium text-gray-900">
                                                {admin.email}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-900">
                                                {admin.namaLengkap}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${admin.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {admin.isActive ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-500">
                                                {new Date(admin.createdAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                                                <button
                                                    onClick={() => handleEdit(admin.userId)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(admin.userId)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Combined Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full max-w-lg mx-auto">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                {selectedAdmin ? 'Edit Admin' : 'Tambah Admin Baru'}
                                            </h3>
                                            {error && (
                                                <div className="mt-2 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                                                    <p className="text-sm text-red-700">{error}</p>
                                                </div>
                                            )}
                                            <form onSubmit={handleSubmit} className="mt-4 space-y-4 px-4 sm:px-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        disabled={!!selectedAdmin}
                                                        className="mt-1 block w-full border border-gray-300 bg-background rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                {!selectedAdmin && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            className="mt-1 block w-full border border-gray-300 bg-background rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Nama Lengkap
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="namaLengkap"
                                                        value={formData.namaLengkap}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border border-gray-300 bg-background rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Status
                                                    </label>
                                                    <select
                                                        name="isActive"
                                                        value={formData.isActive.toString()}
                                                        onChange={handleChange}
                                                        className="mt-1 block w-full border border-gray-300 bg-background rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="true">Aktif</option>
                                                        <option value="false">Nonaktif</option>
                                                    </select>
                                                </div>
                                                <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row-reverse gap-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        {isSubmitting ? 'Memproses...' : selectedAdmin ? 'Simpan' : 'Tambah Admin'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCloseModal}
                                                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        Batal
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-center z-50 overflow-y-auto">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block w-fit h-fit z-50">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                        <Image src={DeleteIcon} alt="Delete Icon" width={40} height={40} className="w-8 h-8" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Hapus Admin
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse sm:flex-row-reverse gap-2">
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Hapus
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelDelete}
                                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section >
    )
}
