'use client';

import React from 'react';

import { Modal } from '@/hooks/dashboard/super-admins/guru/Modal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/guru/DeleteModal';

import { GuruTable } from '@/hooks/dashboard/super-admins/guru/GuruTable';

import { GuruForm } from '@/hooks/dashboard/super-admins/guru/GuruForm';

import { Pagination } from '@/hooks/dashboard/super-admins/guru/Pagination';

import { useGuruManagement } from '@/hooks/dashboard/super-admins/guru/utils/useGuruManagement';

import { GuruFormData } from '@/hooks/schema/super-admins/guru/guru';

export default function Guru() {
    const {
        gurus,
        isModalOpen: showForm,
        setIsModalOpen: setShowForm,
        formData,
        isEditing,
        isLoading,
        isDataLoading,
        handleSubmit,
        handleEdit,
        handleCloseModal,
        setFormData,
        setSelectedGuruId,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        handleConfirmDelete,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useGuruManagement();

    const handleFormDataChange = (data: GuruFormData) => {
        setFormData(data as typeof formData);
    };

    return (
        <section className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-title">
                    Daftar Guru
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-grow sm:flex-grow-0">
                        <input
                            type="text"
                            placeholder="Cari guru..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#4318FF] focus:border-[#4318FF] bg-white shadow-sm"
                        />
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 bg-[#4318FF] hover:bg-[#3A16D9] text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Tambah Guru
                    </button>
                </div>
            </div>

            <GuruTable
                gurus={gurus}
                isDataLoading={isDataLoading}
                handleEdit={handleEdit}
                setSelectedGuruId={setSelectedGuruId}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onPageChange={setCurrentPage}
            />

            <Modal isOpen={showForm} onClose={handleCloseModal}>
                <h2 className="text-2xl font-bold mb-6 text-background">
                    {isEditing ? 'Edit Guru' : 'Tambah Guru Baru'}
                </h2>
                <GuruForm
                    formData={formData}
                    setFormData={handleFormDataChange}
                    handleSubmit={handleSubmit}
                    handleCloseModal={handleCloseModal}
                    isEditing={isEditing}
                    isLoading={isLoading}
                />
            </Modal>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isLoading}
            />
        </section>
    );
}


