import { useState } from 'react';
import GlassCard from '../ui/GlassCard';

const punchData = [
    { id: '1', name: 'Sarah Johnson', department: 'Engineering', punchIn: '09:02 AM', punchOut: '06:15 PM', status: 'present' },
    { id: '2', name: 'Michael Chen', department: 'Marketing', punchIn: '09:45 AM', punchOut: '—', status: 'late' },
    { id: '3', name: 'Emily Davis', department: 'HR', punchIn: '08:55 AM', punchOut: '05:30 PM', status: 'present' },
    { id: '4', name: 'James Wilson', department: 'Finance', punchIn: '—', punchOut: '—', status: 'absent' },
    { id: '5', name: 'Lisa Anderson', department: 'Engineering', punchIn: '09:00 AM', punchOut: '—', status: 'present' },
    { id: '6', name: 'Robert Taylor', department: 'Sales', punchIn: '08:30 AM', punchOut: '05:00 PM', status: 'present' },
];

export default function LiveFeed() {
    const [search, setSearch] = useState('');

    const filteredData = punchData.filter(entry =>
        entry.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.department.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        const styles = {
            present: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            late: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
            absent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        };
        return styles[status as keyof typeof styles] || styles.present;
    };

    return (
        <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Punch Feed
                </h3>
                <div className="relative">
                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 w-full sm:w-48 lg:w-64"
                    />
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
                {filteredData.map((entry) => (
                    <div key={entry.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                    {entry.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-800 dark:text-white text-sm">{entry.name}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{entry.department}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${getStatusBadge(entry.status)}`}>
                                {entry.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <i className="fa-solid fa-sign-in-alt text-emerald-500 text-[10px]"></i>
                                <span className="text-slate-600 dark:text-slate-400">{entry.punchIn}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="fa-solid fa-sign-out-alt text-rose-500 text-[10px]"></i>
                                <span className="text-slate-600 dark:text-slate-400">{entry.punchOut}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[500px] px-4 sm:px-0">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                <th className="pb-3 sm:pb-4 pr-2 sm:pr-4">Employee</th>
                                <th className="pb-3 sm:pb-4 pr-2 sm:pr-4 hidden md:table-cell">Department</th>
                                <th className="pb-3 sm:pb-4 pr-2 sm:pr-4">In</th>
                                <th className="pb-3 sm:pb-4 pr-2 sm:pr-4">Out</th>
                                <th className="pb-3 sm:pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredData.map((entry) => (
                                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="py-3 sm:py-4 pr-2 sm:pr-4">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[10px] sm:text-sm font-bold flex-shrink-0">
                                                {entry.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="font-medium text-slate-800 dark:text-white text-xs sm:text-sm block truncate">{entry.name}</span>
                                                <span className="text-[10px] text-slate-500 md:hidden">{entry.department}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">{entry.department}</td>
                                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{entry.punchIn}</td>
                                    <td className="py-3 sm:py-4 pr-2 sm:pr-4 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{entry.punchOut}</td>
                                    <td className="py-3 sm:py-4">
                                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold capitalize ${getStatusBadge(entry.status)}`}>
                                            {entry.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </GlassCard>
    );
}
