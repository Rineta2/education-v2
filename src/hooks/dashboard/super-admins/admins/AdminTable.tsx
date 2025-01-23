import { AdminTableProps } from "@/hooks/schema/super-admins/admin/admin";

import { PencilOff, Trash2 } from "lucide-react";

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
                <tr key={index} className="animate-pulse">
                    {[...Array(4)].map((_, cellIndex) => (
                        <td key={cellIndex} className="px-4 sm:px-6 py-4">
                            <div className={`h-4 bg-gray-200 rounded ${cellIndex === 3 ? 'ml-auto w-20' : 'w-3/4'}`}></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
            <div className="overflow-x-auto">
                <table className="divide-y divide-gray-200 w-full mt-4" role="table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                            <th scope="col" className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-4 sm:px-6 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <TableSkeleton />
                    ) : (
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 sm:px-6 py-12 text-center text-sm text-gray-500">
                                        {searchTerm ? 'Tidak ada admin yang sesuai dengan pencarian' : 'Tidak ada data admin'}
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{admin.email}</td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{admin.namaLengkap}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {admin.isActive ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 text-center whitespace-nowrap flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onEdit(admin)}
                                                style={{ backgroundColor: "#000000", color: "#ffffff", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
                                            >
                                                <PencilOff className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => onDelete(admin.id)}
                                                style={{ backgroundColor: "#B82132", color: "#ffffff", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
                                            >
                                                <Trash2 className="w-4 h-4" />
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