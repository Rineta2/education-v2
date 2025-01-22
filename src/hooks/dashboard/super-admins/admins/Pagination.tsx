import { PaginationProps } from "@/hooks/schema/super-admins/admin/admin";

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange
}: PaginationProps) {
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
    const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="mt-6">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Desktop pagination */}
                <nav className="sm:inline-flex hidden isolate -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === 1
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'hover:bg-gray-50 cursor-pointer'
                            }`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onPageChange(idx + 1)}
                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === idx + 1
                                ? 'bg-blue-500 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                                }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === totalPages
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'hover:bg-gray-50 cursor-pointer'
                            }`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile pagination */}
                <div className="flex justify-between w-full sm:hidden">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700 p-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                        Next
                    </button>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-700 text-center">
                    Showing <span className="font-medium">{indexOfFirstItem}</span> to{' '}
                    <span className="font-medium">{indexOfLastItem}</span>{' '}
                    of <span className="font-medium">{totalItems}</span> results
                </p>
            </div>
        </div>
    );
}