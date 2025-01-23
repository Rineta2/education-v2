import Image from 'next/image';

import deleteImg from "@/components/assets/dashboard/delete.png";

import { DeleteModalProps } from "@/hooks/schema/super-admins/admin/admin";

export default function DeleteModal({ isOpen, isLoading, onClose, onConfirm }: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 relative" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="mb-5 w-16 h-16">
                        <Image
                            src={deleteImg}
                            className="w-full h-full object-cover"
                            alt="delete icon"
                            width={500}
                            height={500}
                            priority
                        />
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">Konfirmasi Hapus</h3>

                    <p className="text-gray-600 mb-8">
                        Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="flex gap-4 w-full justify-center p-2">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 
                            transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed min-w-[100px]"
                        >
                            Batal
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg 
                            transition-color disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <span>Menghapus...</span>
                            ) : (
                                'Hapus'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}