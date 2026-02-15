interface ActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
    return (
        <div className="flex justify-end gap-2">
            <button
                onClick={onEdit}
                aria-label="Edit record"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all"
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                onClick={onDelete}
                aria-label="Delete record"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
}
