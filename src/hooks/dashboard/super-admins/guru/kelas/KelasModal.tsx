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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEditing ? 'Edit Kelas' : 'Tambah Kelas'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="block mb-1">Nama Kelas</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={onChange}
                            className={`w-full p-2 border rounded bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="Masukkan nama kelas"
                        />
                        {errors.nama && (
                            <p className="text-red-500 text-sm">{errors.nama}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                                } text-white px-4 py-2 rounded transition-colors duration-200`}
                        >
                            {isSubmitting ? 'Menyimpan...' : (isEditing ? 'Update Kelas' : 'Tambah Kelas')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};