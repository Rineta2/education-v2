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

    const renderPageNumbers = () => {
        const pages = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Jika total halaman <= 7, tampilkan semua nomor halaman
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Selalu tampilkan halaman pertama
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Tampilkan halaman di sekitar halaman saat ini
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Selalu tampilkan halaman terakhir
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto", marginTop: "3rem" }}>
            <div className="flex flex-col items-center justify-center gap-6">
                {/* Desktop pagination */}
                <nav className="sm:inline-flex hidden isolate rounded-xl shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-l-xl px-3 py-2.5 text-gray-500 ring-1 ring-inset ring-gray-300 transition-all duration-200 ${currentPage === 1
                            ? 'bg-gray-50 cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-50 hover:text-gray-700 cursor-pointer'
                            }`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {renderPageNumbers().map((page, idx) => (
                        page === '...' ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="relative inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 bg-gray-50"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={idx}
                                onClick={() => onPageChange(page as number)}
                                className={`relative inline-flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 ${currentPage === page
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:z-20 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
                                    : 'text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:z-20'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-r-xl px-3 py-2.5 text-gray-500 ring-1 ring-inset ring-gray-300 transition-all duration-200 ${currentPage === totalPages
                            ? 'bg-gray-50 cursor-not-allowed opacity-50'
                            : 'hover:bg-gray-50 hover:text-gray-700 cursor-pointer'
                            }`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile pagination */}
                <div className="flex items-center justify-between w-full sm:hidden">
                    <button
                        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 transition-all duration-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 transition-all duration-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>

                {/* Results count */}
                <p className="text-sm text-gray-600">
                    Showing <span className="font-medium">{indexOfFirstItem}</span> to{' '}
                    <span className="font-medium">{indexOfLastItem}</span>{' '}
                    of <span className="font-medium">{totalItems}</span> results
                </p>
            </div>
        </div>
    );
}