import { PaginationProps } from '@/hooks/schema/super-admins/guru/guru';

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
    return (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 transition-colors text-sm font-medium shadow-sm"
            >
                Previous
            </button>
            <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-all text-sm font-medium shadow-sm ${currentPage === page
                            ? 'bg-[#4318FF] text-white'
                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 transition-colors text-sm font-medium shadow-sm"
            >
                Next
            </button>
        </div>
    );
};