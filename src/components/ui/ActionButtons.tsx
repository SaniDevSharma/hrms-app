interface ActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: ActionButtonsProps) {
    return (
        <div className="flex justify-end gap-2">
            <button
                onClick={onEdit}
                data-tooltip="Edit"
                className="tooltip-below w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-200 hover:scale-110"
            >
                <i className="fa-solid fa-pen-to-square text-sm"></i>
            </button>
            <button
                onClick={onDelete}
                data-tooltip="Delete"
                className="tooltip-below w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-110"
            >
                <i className="fa-solid fa-trash text-sm"></i>
            </button>
        </div>
    );
}
