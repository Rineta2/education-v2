import { GuruTableProps } from '@/hooks/schema/super-admins/guru/guru';

import { TableSkeleton } from '@/hooks/dashboard/super-admins/guru/TableSkeleton';

export const GuruTable = ({
    gurus,
    isDataLoading,
    handleEdit,
    setSelectedGuruId,
    setIsDeleteModalOpen
}: GuruTableProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Nama Lengkap</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Mata Pelajaran</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    {isDataLoading ? (
                        <TableSkeleton />
                    ) : (
                        <tbody className="divide-y divide-gray-100">
                            {gurus.map((guru) => (
                                <tr key={guru.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-700">{guru.namaLengkap}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{guru.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{guru.mataPelajaran}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${guru.isActive
                                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                                            : 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                                            }`}>
                                            {guru.isActive ? 'Aktif' : 'Tidak Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(guru)}
                                            className="inline-flex items-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-sm rounded-lg transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedGuruId(guru.id);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};