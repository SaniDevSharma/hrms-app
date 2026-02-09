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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Live Punch Feed
                </h3>
                <div className="relative">
                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl text-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            <th className="pb-4 pr-4">Employee</th>
                            <th className="pb-4 pr-4">Department</th>
                            <th className="pb-4 pr-4">Punch In</th>
                            <th className="pb-4 pr-4">Punch Out</th>
                            <th className="pb-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {filteredData.map((entry) => (
                            <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                            {entry.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-medium text-slate-800 dark:text-white text-sm">{entry.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 pr-4 text-sm text-slate-600 dark:text-slate-400">{entry.department}</td>
                                <td className="py-4 pr-4 text-sm font-medium text-slate-700 dark:text-slate-300">{entry.punchIn}</td>
                                <td className="py-4 pr-4 text-sm font-medium text-slate-700 dark:text-slate-300">{entry.punchOut}</td>
                                <td className="py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(entry.status)}`}>
                                        {entry.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}
