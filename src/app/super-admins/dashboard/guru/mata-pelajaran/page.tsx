"use client"

import { useState, useEffect } from 'react'
import { db } from '@/utils/firebase'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'

interface MataPelajaran {
    id?: string
    nama: string
}

export default function MataPelajaranPage() {
    const [mataPelajaranList, setMataPelajaranList] = useState<MataPelajaran[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10 // Adjust this number as needed
    const [formData, setFormData] = useState<MataPelajaran>({
        nama: ''
    })
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(true)

    // Add useEffect to handle body scroll
    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showForm])

    // Read - Fetch all mata pelajaran
    const fetchMataPelajaran = async () => {
        setIsDataLoading(true)
        try {
            const querySnapshot = await getDocs(collection(db, 'mata_pelajaran'))
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as MataPelajaran[]
            setMataPelajaranList(data)
        } catch {
            toast.error('Gagal memuat data')
        } finally {
            setIsDataLoading(false)
        }
    }

    useEffect(() => {
        fetchMataPelajaran()
    }, [])

    // Filter mata pelajaran based on search query
    const filteredMataPelajaran = mataPelajaranList.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Calculate pagination
    const totalPages = Math.ceil(filteredMataPelajaran.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredMataPelajaran.slice(startIndex, startIndex + itemsPerPage)

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const delta = 1 // Number of pages to show before and after current page
        const range = []
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            range.unshift('...')
        }
        if (currentPage + delta < totalPages - 1) {
            range.push('...')
        }

        range.unshift(1)
        if (totalPages > 1) {
            range.push(totalPages)
        }

        return range
    }

    // Create - Add new mata pelajaran
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (isEditing) {
                // Update
                const updateData = {
                    nama: formData.nama
                }
                await updateDoc(doc(db, 'mata_pelajaran', editId), updateData)
                toast.success('Mata pelajaran berhasil diperbarui!')
                setIsEditing(false)
                setEditId('')
            } else {
                // Create
                await addDoc(collection(db, 'mata_pelajaran'), formData)
                toast.success('Mata pelajaran berhasil ditambahkan!')
            }
            setFormData({ nama: '' })
            setShowForm(false)
            fetchMataPelajaran()
        } catch {
            toast.error('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setIsLoading(false)
        }
    }

    // Update - Set form data for editing
    const handleEdit = (item: MataPelajaran) => {
        setIsEditing(true)
        setEditId(item.id!)
        setFormData({
            nama: item.nama
        })
        setShowForm(true)
    }

    // Delete - Remove mata pelajaran
    const handleDelete = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
            setIsLoading(true)
            try {
                await deleteDoc(doc(db, 'mata_pelajaran', id))
                toast.success('Mata pelajaran berhasil dihapus!')
                fetchMataPelajaran()
            } catch {
                toast.error('Terjadi kesalahan saat menghapus.')
            } finally {
                setIsLoading(false)
            }
        }
    }

    return <section className="p-4">
        <div className="container">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-title">
                        Daftar Mata Pelajaran
                    </h1>

                    <input
                        type="text"
                        placeholder="Cari Mata Pelajaran"
                        className="w-fit p-2 border rounded bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setCurrentPage(1) // Reset to first page when searching
                        }}
                    />
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center justify-center gap-2 bg-[#4318FF] hover:bg-[#3A16D9] text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                    Tambah Mata Pelajaran
                </button>
            </div>
        </div>

        {/* Modal Form */}
        {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            {isEditing ? 'Edit' : 'Tambah'} Mata Pelajaran
                        </h2>

                        <button
                            onClick={() => {
                                setShowForm(false)
                                setFormData({ nama: '' })
                                setIsEditing(false)
                                setEditId('')
                            }}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="block mb-1">Nama Mata Pelajaran</label>
                            <input
                                type="text"
                                value={formData.nama}
                                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                className="w-full p-2 border rounded bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => {
                                    setShowForm(false)
                                    setFormData({ nama: '' })
                                    setIsEditing(false)
                                    setEditId('')
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Loading...</span>
                                    </>
                                ) : (
                                    `${isEditing ? 'Update' : 'Tambah'} Mata Pelajaran`
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Updated List with Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {isDataLoading ? (
                // Skeleton loading cards
                [...Array(8)].map((_, index) => (
                    <div key={index} className="border p-4 rounded shadow-sm animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="flex gap-2">
                            <div className="h-8 bg-gray-200 rounded w-16"></div>
                            <div className="h-8 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                ))
            ) : (
                paginatedData.map((item) => (
                    <div key={item.id} className="border p-4 rounded shadow-sm">
                        <h3 className="font-bold">{item.nama}</h3>
                        <div className="mt-2 space-x-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id!)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Show pagination only when data is loaded and there are multiple pages */}
        {!isDataLoading && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                    ←
                </button>

                {getPageNumbers().map((pageNum, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded border ${pageNum === currentPage
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                            } ${typeof pageNum !== 'number' ? 'cursor-default' : ''}`}
                    >
                        {pageNum}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border hover:bg-gray-100 disabled:opacity-50"
                >
                    →
                </button>
            </div>
        )}
    </section>
}