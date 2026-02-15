import { useState, useCallback } from 'react';

interface UseCrudMasterProps<T extends { id: string }> {
    initialData: T[];
    defaultValues: Partial<T>;
}

export function useCrudMaster<T extends { id: string }>({
    initialData,
    defaultValues,
}: UseCrudMasterProps<T>) {
    const [items, setItems] = useState<T[]>(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<T>>(defaultValues);

    const handleAdd = useCallback(() => {
        setIsEditMode(false);
        setCurrentItem({ ...defaultValues });
        setIsModalOpen(true);
    }, [defaultValues]);

    const handleEdit = useCallback((item: T) => {
        setIsEditMode(true);
        setCurrentItem({ ...item });
        setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback((id: string) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setItems(prev => prev.filter(item => item.id !== id));
        }
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (isEditMode && currentItem.id) {
            setItems(prev =>
                prev.map(item => item.id === currentItem.id ? currentItem as T : item)
            );
        } else {
            const newItem = {
                ...currentItem,
                id: crypto.randomUUID(),
            } as T;
            setItems(prev => [...prev, newItem]);
        }
        setIsModalOpen(false);
    }, [isEditMode, currentItem]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        items,
        setItems,
        isModalOpen,
        isEditMode,
        currentItem,
        setCurrentItem,
        handleAdd,
        handleEdit,
        handleDelete,
        handleSubmit,
        closeModal,
    };
}
