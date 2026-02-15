interface EmptyStateProps {
    icon?: string;
    title?: string;
    message?: string;
}

export default function EmptyState({
    icon = 'fa-solid fa-inbox',
    title = 'No records found',
    message = 'Try adjusting your search or filters',
}: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <i className={`${icon} text-2xl`}></i>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{message}</p>
        </div>
    );
}
