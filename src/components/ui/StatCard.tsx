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
            className={`glass-card stat-card rounded-2xl p-5 cursor-pointer animate-slide-up ${stagger ? `stagger-${stagger}` : ''}`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                    <p className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">{value}</p>
                    {change && (
                        <div className={`flex items-center gap-1 mt-2 text-sm font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                            <i className={`fa-solid fa-arrow-${trend === 'up' ? 'up' : 'down'} text-xs`}></i>
                            <span>{change}</span>
                            <span className="text-slate-400 font-normal">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`stat-icon h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
                    <i className={`fa-solid ${icon} text-lg`}></i>
                </div>
            </div>
        </div>
    );
}
