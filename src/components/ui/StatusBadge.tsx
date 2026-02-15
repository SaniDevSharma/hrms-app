interface StatusBadgeProps {
    status: 'Active' | 'Inactive';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const isActive = status === 'Active';

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${isActive
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20'
                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-500/20'
                }`}
            aria-label={`Status: ${status}`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'
                    }`}
            ></span>
            {status}
        </span>
    );
}
