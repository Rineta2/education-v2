import Image from 'next/image';

import deleteImg from "@/components/assets/dashboard/delete.png";

interface DeleteModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ isOpen, isLoading, onClose, onConfirm }: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all mx-4">
                <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                            <Image src={deleteImg} className='w-16 h-16' alt="delete" width={500} height={500} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
                        <p className="text-gray-500 mb-6">Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Menghapus...
                                    </>
                                ) : (
                                    'Hapus'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}