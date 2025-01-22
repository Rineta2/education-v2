import { FormData } from "@/hooks/schema/super-admins/admin/admin";

interface AddEditModalProps {
    isOpen: boolean;
    isEditing: boolean;
    isLoading: boolean;
    formData: FormData;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (formData: FormData) => void;
}

export default function AddEditModal({
    isOpen,
    isEditing,
    isLoading,
    formData,
    onClose,
    onSubmit,
    onFormChange,
}: AddEditModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditing ? 'Edit Admin' : 'Tambah Admin'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                                className="w-full p-2 border rounded bg-background"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                value={formData.namaLengkap}
                                onChange={(e) => onFormChange({ ...formData, namaLengkap: e.target.value })}
                                className="w-full p-2 border rounded bg-background"
                                required
                            />
                        </div>
                        {!isEditing && (
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
                                    className="w-full p-2 border rounded bg-background"
                                    required
                                    minLength={6}
                                    title="Password minimal 6 karakter"
                                />
                                {formData.password && formData.password.length < 6 && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Password minimal 6 karakter
                                    </p>
                                )}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                value={formData.isActive ? "active" : "inactive"}
                                onChange={(e) => onFormChange({ ...formData, isActive: e.target.value === "active" })}
                                className="w-full p-2 border rounded bg-background"
                                required
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                        {isEditing ? 'Mengupdate...' : 'Menambahkan...'}
                                    </>
                                ) : (
                                    isEditing ? 'Update Admin' : 'Tambah Admin'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}