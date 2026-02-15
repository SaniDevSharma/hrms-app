import { useMemo } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    onItemsPerPageChange?: (items: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    onItemsPerPageChange
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                endPage = Math.min(totalPages - 1, 4);
            }
            if (currentPage >= totalPages - 2) {
                startPage = Math.max(2, totalPages - 3);
            }

            if (startPage > 2) {
                pages.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages - 1) {
                pages.push('...');
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }
        return pages;
    }, [currentPage, totalPages]);

    if (totalItems === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-2 border-t border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center gap-4">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{startItem}</span> to <span className="font-semibold text-slate-700 dark:text-slate-200">{endItem}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{totalItems}</span> entries
                </div>

                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
                    className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                    <option value={10}>10 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                </select>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>

                {pageNumbers.map((page, index) => (
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${currentPage === page
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="w-8 h-8 flex items-center justify-center text-slate-400 text-xs">
                            ...
                        </span>
                    )
                ))}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    );
}
