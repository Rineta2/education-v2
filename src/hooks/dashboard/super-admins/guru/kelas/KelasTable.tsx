import React from 'react';

import { Kelas } from '@/hooks/schema/super-admins/guru/guru';

interface KelasTableProps {
    items: Kelas[];
    isLoading: boolean;
    onEdit: (item: Kelas) => void;
    onDelete: (id: string) => void;
}

export const KelasTable: React.FC<KelasTableProps> = ({
    items,
    isLoading,
    onEdit,
    onDelete
}) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                        <div className="flex justify-end space-x-3">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-blue-100 p-5 mb-5">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada data kelas</h3>
                    <p className="text-gray-600">Silakan tambah kelas baru untuk memulai</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 w-full group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {item.nama}
                        </h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => onEdit(item)}
                                className="p-2.5 rounded-lg text-gray-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                                title="Edit"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => onDelete(item.id)}
                                className="p-2.5 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-all duration-300"
                                title="Hapus"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                        <svg className="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Kelas {item.nama}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};