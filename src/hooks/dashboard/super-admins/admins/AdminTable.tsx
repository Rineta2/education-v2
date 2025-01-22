import { Admin } from "@/hooks/schema/super-admins/admin/admin";

interface AdminTableProps {
    admins: Admin[];
    isLoading: boolean;
    searchTerm: string;
    onEdit: (admin: Admin) => void;
    onDelete: (id: string) => void;
}

export default function AdminTable({
    admins,
    isLoading,
    searchTerm,
    onEdit,
    onDelete
}: AdminTableProps) {
    const TableSkeleton = () => (
        <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, index) => (
                <tr key={index}>
                    <td className="px-4 sm:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 sm:px-6 py-8 text-center text-gray-500">
                                        {searchTerm ? 'Tidak ada admin yang sesuai dengan pencarian' : 'Tidak ada data admin'}
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-gray-50">
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{admin.email}</td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">{admin.namaLengkap}</td>
                                        <td className="px-4 sm:px-6 py-4">
                                            <span className={`px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {admin.isActive ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-right space-x-2 text-sm font-medium">
                                            <button
                                                onClick={() => onEdit(admin)}
                                                className="text-yellow-600 hover:text-yellow-700 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(admin.id)}
                                                className="text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}