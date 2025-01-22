import React from 'react'

import Image from 'next/image'

import DeleteIcon from '@/components/assets/dashboard/delete.png'

interface DeleteConfirmationModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const DeleteConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel
}: DeleteConfirmationModalProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-center z-50 overflow-y-auto">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block w-fit h-fit z-50">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <Image src={DeleteIcon} alt="Delete Icon" width={40} height={40} className="w-8 h-8" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Hapus Admin
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col-reverse sm:flex-row-reverse gap-2">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Hapus
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    )
}