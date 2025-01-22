import React from 'react'

import { TableRow } from '@/hooks/dashboard/super-admins/TableRow'

import { Admin } from '@/hooks/schema/super-admins/admin/Interface'

interface AdminTableProps {
    currentItems: (Admin | null)[]
    isLoading: boolean
    skeletonArray: null[]
    handleEdit: (admin: Admin) => void
    handleDelete: (userId: string) => void
}

export function AdminTable({ currentItems, isLoading, skeletonArray, handleEdit, handleDelete }: AdminTableProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Nama Lengkap
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Status
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Tanggal Dibuat
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-[12px] sm:text-[14px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {(isLoading ? skeletonArray : currentItems).map((admin, index) => (
                            <TableRow
                                key={isLoading ? `skeleton-${index}` : (admin?.userId ?? `item-${index}`)}
                                admin={admin as Admin}
                                isLoading={isLoading}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}