import React from 'react'

import { Admin } from '@/hooks/schema/super-admins/admin/Interface'

interface TableRowProps {
    admin: Admin
    isLoading: boolean
    handleEdit: (admin: Admin) => void
    handleDelete: (userId: string) => void
}

export function TableRow({ admin, isLoading, handleEdit, handleDelete }: TableRowProps) {
    if (isLoading) {
        return (
            <tr>
                <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] font-medium text-gray-900">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-900">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-500">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </td>
            </tr>
        )
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] font-medium text-gray-900">
                {admin.email}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-900">
                {admin.namaLengkap}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {admin.isActive ? 'Aktif' : 'Nonaktif'}
                </span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px] text-gray-500">
                {new Date(admin.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-[12px] sm:text-[14px]">
                <button
                    onClick={() => handleEdit(admin)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(admin.userId)}
                    className="text-red-600 hover:text-red-900"
                >
                    Hapus
                </button>
            </td>
        </tr>
    )
}