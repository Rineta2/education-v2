import { MataPelajaranFormProps } from '@/hooks/schema/super-admins/guru/guru'

export function MataPelajaranForm({
    showForm,
    isEditing,
    isLoading,
    formData,
    onClose,
    onSubmit,
    onChange
}: MataPelajaranFormProps) {
    if (!showForm) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-6 rounded-lg" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {isEditing ? 'Edit' : 'Tambah'} Mata Pelajaran
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="block mb-1">Nama Mata Pelajaran</label>
                        <input
                            type="text"
                            value={formData.nama}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full p-2 border rounded bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Loading...</span>
                                </>
                            ) : (
                                `${isEditing ? 'Update' : 'Tambah'} Mata Pelajaran`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}