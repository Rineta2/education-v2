import React from 'react';

import { FormData, FormErrors } from '@/hooks/schema/super-admins/guru/guru';

interface KelasModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: FormData;
    errors: FormErrors;
    isEditing: boolean;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KelasModal: React.FC<KelasModalProps> = ({
    isOpen,
    onClose,
    formData,
    errors,
    isEditing,
    isSubmitting,
    onSubmit,
    onChange
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div
                className="bg-white border border-gray-200 p-4 rounded-2xl shadow-2xl transform transition-all duration-300 scale-100 animate-slideIn"
                style={{ width: '100%', maxWidth: '400px' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Kelas' : 'Tambah Kelas'}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2 flex flex-col gap-4">
                        <label className="block text-sm font-semibold text-gray-700">Nama Kelas</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={onChange}
                            className="w-full px-4 py-3 border rounded-xl bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-100 placeholder:text-gray-400"
                            placeholder="Masukkan nama kelas"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm mt-1 animate-shake">{errors.nama}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2.5 text-sm font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${isSubmitting
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                        >
                            {isSubmitting ? 'Menyimpan...' : (isEditing ? 'Update Kelas' : 'Tambah Kelas')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};