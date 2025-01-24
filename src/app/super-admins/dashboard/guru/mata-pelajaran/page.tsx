"use client"

import { useMataPelajaran } from '@/hooks/dashboard/super-admins/guru/mata-pelajaran/utils/useMataPelajaran'

import { MataPelajaranForm } from '@/hooks/dashboard/super-admins/guru/mata-pelajaran/MataPelajaranForm'

import { MataPelajaranItem } from '@/hooks/dashboard/super-admins/guru/mata-pelajaran/MataPelajaranItem'

import { Pagination } from '@/hooks/dashboard/super-admins/guru/mata-pelajaran/Pagination'

export default function MataPelajaranPage() {
    const {
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        formData,
        showForm,
        setShowForm,
        isEditing,
        isLoading,
        isDataLoading,
        paginatedData,
        totalPages,
        handleSubmit,
        handleEdit,
        handleDelete,
        handleCloseForm,
        setFormData
    } = useMataPelajaran()

    return (
        <section className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex flex-col gap-4 w-full sm:w-auto">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Daftar Mata Pelajaran
                        </h1>

                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Cari Mata Pelajaran"
                                className="w-full p-3 pl-10 border rounded-xl bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                            />
                            <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Mata Pelajaran
                    </button>
                </div>

                <MataPelajaranForm
                    showForm={showForm}
                    isEditing={isEditing}
                    isLoading={isLoading}
                    formData={formData}
                    onClose={handleCloseForm}
                    onSubmit={handleSubmit}
                    onChange={(value) => setFormData({ ...formData, nama: value })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {isDataLoading ? (
                        [...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                                    <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        paginatedData.map((item) => (
                            <MataPelajaranItem
                                key={item.id}
                                item={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    )
}