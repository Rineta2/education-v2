import { AddEditModalProps } from "@/hooks/schema/super-admins/admin/admin";

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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
                <div className="p-6 w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {isEditing ? 'Edit Admin' : 'Tambah Admin'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4 w-full">
                        <div className="w-full">
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                value={formData.email}
                                onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={formData.namaLengkap}
                                onChange={(e) => onFormChange({ ...formData, namaLengkap: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
                                required
                            />
                        </div>
                        {!isEditing && (
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Minimal 6 karakter"
                                    value={formData.password}
                                    onChange={(e) => onFormChange({ ...formData, password: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
                                    required
                                    minLength={6}
                                />
                                {formData.password && formData.password.length < 6 && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Password minimal 6 karakter
                                    </p>
                                )}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Status
                            </label>
                            <select
                                value={formData.isActive ? "active" : "inactive"}
                                onChange={(e) => onFormChange({ ...formData, isActive: e.target.value === "active" })}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-500 bg-white"
                                required
                            >
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center justify-center min-w-[120px]
                                    ${isLoading
                                        ? 'bg-primary cursor-not-allowed'
                                        : 'bg-primary hover:bg-primary/90'
                                    } text-white`}
                            >
                                {isLoading ? (
                                    <span>
                                        {isEditing ? 'Mengupdate...' : 'Menambahkan...'}
                                    </span>
                                ) : (
                                    isEditing ? 'Update Admin' : 'Tambah Admin'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}