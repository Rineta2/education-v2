'use client'

import React, { useState, useMemo } from 'react'

import ReactPaginate from 'react-paginate'

import { useAdmins } from '@/utils/lib/super-admins/admins/useAdmins'

import { useAdminManagement } from '@/app/super-admins/dashboard/admins/components/utils/useAdminManagement'

import { AdminFormModal } from '@/app/super-admins/dashboard/admins/components/AdminFormModal'

import { DeleteConfirmationModal } from '@/app/super-admins/dashboard/admins/components/DeleteModal'

import { AdminTable } from '@/app/super-admins/dashboard/admins/components/Table'

import { SearchBar } from '@/app/super-admins/dashboard/admins/components/SearchBar'

export default function Admins() {
    const { admins, isLoading } = useAdmins()
    const [searchTerm, setSearchTerm] = useState('')
    const {
        isModalOpen,
        setIsModalOpen,
        selectedAdmin,
        formData,
        error,
        isSubmitting,
        isDeleteModalOpen,
        handleEdit,
        handleCloseModal,
        handleDelete,
        confirmDelete,
        cancelDelete,
        handleSubmit,
        handleChange
    } = useAdminManagement()
    const [itemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)

    // Add skeleton array
    const skeletonArray = useMemo(() => Array(5).fill(null), [])

    const filteredAdmins = isLoading
        ? skeletonArray // Use skeleton array when loading
        : admins.filter(admin =>
            admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
        )

    // Calculate pagination
    const pageCount = Math.ceil(filteredAdmins.length / itemsPerPage)
    const offset = currentPage * itemsPerPage
    const currentItems = filteredAdmins.slice(offset, offset + itemsPerPage)

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
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

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <AdminTable
                    currentItems={currentItems}
                    isLoading={isLoading}
                    skeletonArray={skeletonArray}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                        containerClassName="flex items-center gap-2"
                        previousClassName="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        nextClassName="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        pageClassName="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        activeClassName="!bg-blue-600 !text-white !border-blue-600"
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                </div>

                <AdminFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    error={error}
                    isSubmitting={isSubmitting}
                    selectedAdmin={selectedAdmin}
                />

                <DeleteConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </section>
    )
}
