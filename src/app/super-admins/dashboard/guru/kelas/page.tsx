'use client';

import React, { useEffect, useState } from 'react';

import { useKelas } from '@/hooks/dashboard/super-admins/guru/kelas/utils/ServiceKelas';

import { usePagination } from '@/hooks/dashboard/super-admins/guru/kelas/utils/usePagination';

import { KelasModal } from '@/hooks/dashboard/super-admins/guru/kelas/KelasModal';

import { KelasTable } from '@/hooks/dashboard/super-admins/guru/kelas/KelasTable';

import { Kelas } from '@/hooks/schema/super-admins/guru/guru';

import { kelasService } from '@/hooks/dashboard/super-admins/guru/kelas/utils/FetchKelas';

export default function KelasPage() {
    const {
        kelas,
        isLoading,
        formData,
        isEditing,
        errors,
        isSubmitting,
        setKelas,
        setIsLoading,
        setFormData,
        setIsEditing,
        setEditId,
        setErrors,
        handleSubmit,
        handleDelete
    } = useKelas();

    const {
        currentPage,
        searchQuery,
        setCurrentPage,
        setSearchQuery,
        getPaginationRange,
        paginateData
    } = usePagination();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await kelasService.getAllKelas();
                setKelas(data);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setIsLoading, setKelas]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleEdit = (item: Kelas) => {
        setFormData({ nama: item.nama });
        setIsEditing(true);
        setEditId(item.id);
        setIsModalOpen(true);
    };

    const { currentItems, totalPages, indexOfFirstItem, indexOfLastItem, totalItems } = paginateData(kelas);

    return (
        <section className="p-4 sm:p-6">
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex-1 w-full">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Manajemen Kelas
                        </h1>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari kelas..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full p-3 pl-10 border rounded-lg bg-white shadow-sm border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsEditing(false);
                            setEditId(null);
                            setFormData({ nama: '' });
                            setErrors({});
                        }}
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Kelas
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <KelasTable
                        items={currentItems}
                        isLoading={isLoading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

                {/* Pagination Section */}
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    {isLoading ? (
                        <>
                            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="flex items-center space-x-2">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-sm text-gray-500">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${currentPage === 1
                                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'}`}
                                >
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                <div className="flex items-center gap-1">
                                    {getPaginationRange(currentPage, totalPages).map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
                                            disabled={page === '...'}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                ${typeof page !== 'number'
                                                    ? 'cursor-default'
                                                    : page === currentPage
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${currentPage === totalPages
                                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <KelasModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                errors={errors}
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                onSubmit={async (e) => {
                    const success = await handleSubmit(e);
                    if (success) setIsModalOpen(false);
                }}
                onChange={(e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
                    if (errors[e.target.name as keyof typeof errors]) {
                        setErrors({ ...errors, [e.target.name]: undefined });
                    }
                }}
            />
        </section>
    );
}
