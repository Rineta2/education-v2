export function Pagination({
    currentPage,
    totalPages,
    onPageChange
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const getPageNumbers = () => {
        const delta = 1;
        const range = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift('...');
        }
        if (currentPage + delta < totalPages - 1) {
            range.push('...');
        }

        range.unshift(1);
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="flex justify-between items-center gap-4 mt-6 px-4">
            {/* Page info */}
            <div className="text-sm text-gray-600">
                {currentPage} dari {totalPages}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Previous page"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, idx) => (
                        <button
                            key={idx}
                            onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
                            disabled={typeof pageNum !== 'number'}
                            className={`
                                w-10 h-10 rounded-lg flex items-center justify-center
                                bg-primary
                                ${typeof pageNum !== 'number'
                                    ? 'cursor-default'
                                    : ''
                                }
                                ${pageNum === currentPage
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700 border border-gray-200'
                                }
                            `}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Next page"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}