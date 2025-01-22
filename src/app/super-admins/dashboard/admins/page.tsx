"use client"

import React, { useEffect } from 'react';

import { useAdminManagement } from '@/hooks/dashboard/super-admins/admins/utils/useAdminManagement';

import AddEditModal from '@/hooks/dashboard/super-admins/admins/EditModal';

import DeleteModal from '@/hooks/dashboard/super-admins/admins/DeleteModal';

import AdminTable from '@/hooks/dashboard/super-admins/admins/AdminTable';

import Pagination from '@/hooks/dashboard/super-admins/admins/Pagination';

export default function AdminPage() {
    const {
        admins,
        isModalOpen,
        setIsModalOpen,
        formData,
        isEditing,
        isLoading,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        isDeleteModalOpen,
        isDeleteLoading,
        isDataLoading,
        setIsDeleteModalOpen,
        totalPages,
        filteredAdmins,
        handleSubmit,
        handleDelete,
        confirmDelete,
        handleEdit,
        handleCloseModal,
        setFormData,
    } = useAdminManagement();

    // Body scroll lock effect
    useEffect(() => {
        if (isModalOpen || isDeleteModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, isDeleteModalOpen]);

    return (
        <section className="min-h-screen w-full">
            <div className="container mx-auto px-2 sm:px-4">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-title">Kelola Admin</h1>
                <p className="text-sm text-gray-500 mb-6">Kelola admin yang terdaftar di sistem</p>

                {/* Search and Add Button */}
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari admin..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full p-2.5 pl-10 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Admin
                    </button>
                </div>

                {/* Admin Table */}
                <AdminTable
                    admins={admins}
                    isLoading={isDataLoading}
                    searchTerm={searchTerm}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredAdmins.length}
                    itemsPerPage={10}
                    onPageChange={setCurrentPage}
                />

                {/* Modals */}
                <AddEditModal
                    isOpen={isModalOpen}
                    isEditing={isEditing}
                    isLoading={isLoading}
                    formData={formData}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    onFormChange={setFormData}
                />

                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    isLoading={isDeleteLoading}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            </div>
        </section>
    );
}
