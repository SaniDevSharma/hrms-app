import GlassCard from '../ui/GlassCard';

const requests = [
    { id: '1', name: 'Emma Thompson', type: 'Sick Leave', days: '2 days', avatar: 'ET' },
    { id: '2', name: 'David Kim', type: 'Work from Home', days: '1 day', avatar: 'DK' },
    { id: '3', name: 'Anna Garcia', type: 'Vacation', days: '5 days', avatar: 'AG' },
];

const quickActions = [
    { label: 'Mark Attendance', icon: 'fa-user-check', color: 'from-emerald-500 to-teal-600' },
    { label: 'Apply Leave', icon: 'fa-calendar-plus', color: 'from-cyan-500 to-blue-600' },
    { label: 'View Reports', icon: 'fa-chart-bar', color: 'from-violet-500 to-purple-600' },
];

export default function PendingRequests() {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Pending Requests */}
            <GlassCard>
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white">Pending Requests</h3>
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">{requests.length}</span>
                </div>

                <div className="space-y-2 sm:space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                                {request.avatar}
                            </div>
                            <div className="flex-grow min-w-0">
                                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white truncate">{request.name}</p>
                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">{request.type} • {request.days}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                                <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center active:scale-95">
                                    <i className="fa-solid fa-check text-xs sm:text-sm"></i>
                                </button>
                                <button className="h-7 w-7 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center active:scale-95">
                                    <i className="fa-solid fa-xmark text-xs sm:text-sm"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg sm:rounded-xl transition-colors active:scale-[0.98]">
                    View All Requests
                </button>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white mb-3 sm:mb-5">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${action.color} text-white font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200`}
                        >
                            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-md sm:rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                <i className={`fa-solid ${action.icon} text-xs sm:text-sm`}></i>
                            </div>
                            <span className="truncate">{action.label}</span>
                            <i className="fa-solid fa-arrow-right ml-auto opacity-70 text-xs sm:text-sm"></i>
                        </button>
                    ))}
                </div>
            </GlassCard>
        </div>
    );
}
