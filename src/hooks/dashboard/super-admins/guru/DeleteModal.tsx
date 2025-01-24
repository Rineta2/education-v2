import { DeleteModalProps } from "@/hooks/schema/super-admins/guru/guru";

export const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }: DeleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
                <p className="mb-6">Apakah Anda yakin ingin menghapus guru ini?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        disabled={isLoading}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
};