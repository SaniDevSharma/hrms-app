interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
    icon: string;
    color: string;
    stagger?: number;
}

export default function StatCard({ title, value, change, trend, icon, color, stagger }: StatCardProps) {
    return (
        <div
            className={`glass-card stat-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 cursor-pointer animate-slide-up ${stagger ? `stagger-${stagger}` : ''}`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs lg:text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white mt-0.5 sm:mt-1">{value}</p>
                    {change && (
                        <div className={`flex items-center gap-1 mt-1 sm:mt-2 text-[10px] sm:text-xs lg:text-sm font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                            <i className={`fa-solid fa-arrow-${trend === 'up' ? 'up' : 'down'} text-[8px] sm:text-xs`}></i>
                            <span>{change}</span>
                            <span className="text-slate-400 font-normal hidden sm:inline">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`stat-icon h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    <i className={`fa-solid ${icon} text-xs sm:text-sm lg:text-lg`}></i>
                </div>
            </div>
        </div>
    );
}
