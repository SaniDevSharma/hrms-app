interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const isActive = status === 'Active';

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isActive
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive
                    ? 'bg-emerald-500 pulse-dot'
                    : 'bg-slate-400'
                }`}></span>
            {status}
        </span>
    );
}
