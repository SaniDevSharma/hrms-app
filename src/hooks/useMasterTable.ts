import { useState, useMemo, useCallback } from 'react';

interface UseMasterTableProps<T> {
    data: T[];
    filterPredicate: (item: T, searchTerm: string) => boolean;
    initialItemsPerPage?: number;
}

export function useMasterTable<T>({
    data,
    filterPredicate,
    initialItemsPerPage = 10
}: UseMasterTableProps<T>) {
    const [searchTerm, setSearchTermRaw] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    // Wrap setSearchTerm to also reset page
    const setSearchTerm = useCallback((term: string) => {
        setSearchTermRaw(term);
        setCurrentPage(1);
    }, []);

    // Filter data based on search term and predicate
    const filteredData = useMemo(() => {
        return data.filter(item => filterPredicate(item, searchTerm));
    }, [data, searchTerm, filterPredicate]);

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Paginate filtered data
    const paginatedData = useMemo(() => {
        const page = Math.min(currentPage, totalPages || 1);
        const startIndex = (page - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage, totalPages]);

    return {
        searchTerm,
        setSearchTerm,
        currentPage: Math.min(currentPage, totalPages || 1),
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        paginatedData,
        filteredData,
        totalItems,
        totalPages
    };
}

