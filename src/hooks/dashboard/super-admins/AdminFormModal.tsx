import React from 'react'

import { Admin, AdminFormData } from '@/hooks/schema/super-admins/admin/Interface'

interface AdminFormModalProps {
    isOpen: boolean
    onClose: () => void
    formData: AdminFormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    error: string
    isSubmitting: boolean
    selectedAdmin: Admin | null
}

export const AdminFormModal = ({
    isOpen,
    onClose,
    formData,
    handleChange,
    handleSubmit,
    error,
    isSubmitting,
    selectedAdmin
}: AdminFormModalProps) => {
    if (!isOpen) return null

    return (
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
                                            onClick={onClose}
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
    )
}