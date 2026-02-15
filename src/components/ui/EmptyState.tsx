interface EmptyStateProps {
    icon: string;
    title: string;
    message: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
    return (
        <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 mb-4 animate-gentle-bounce">
                <i className={`${icon} text-2xl sm:text-3xl text-slate-400 dark:text-slate-500`}></i>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300 mb-1">{title}</h3>
            <p className="text-sm text-slate-400 dark:text-slate-500">{message}</p>
        </div>
    );
}
