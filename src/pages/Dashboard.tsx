import { useState, useEffect } from 'react';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Charts from '../components/dashboard/Charts';
import LiveFeed from '../components/dashboard/LiveFeed';
import PendingRequests from '../components/dashboard/PendingRequests';

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const stats = [
        { title: 'Total Employees', value: '1,247', change: '+12%', trend: 'up' as const, icon: 'fa-users', color: 'from-cyan-500 to-blue-600' },
        { title: 'Present Today', value: '1,089', change: '+5%', trend: 'up' as const, icon: 'fa-user-check', color: 'from-emerald-500 to-teal-600' },
        { title: 'On Leave', value: '58', change: '-8%', trend: 'down' as const, icon: 'fa-calendar-xmark', color: 'from-amber-500 to-orange-600' },
        { title: 'Late Arrivals', value: '23', change: '-15%', trend: 'down' as const, icon: 'fa-clock', color: 'from-rose-500 to-pink-600' },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <GlassCard className="overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
                            Good Morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">John!</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Here's what's happening with your team today.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">{formatDate(currentTime)}</p>
                            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{formatTime(currentTime)}</p>
                        </div>
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                            <i className="fa-solid fa-calendar-days text-xl"></i>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} stagger={index + 1} />
                ))}
            </div>

            {/* Charts Section */}
            <Charts />

            {/* Live Feed & Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="lg:col-span-2 xl:col-span-3">
                    <LiveFeed />
                </div>
                <div className="lg:col-span-1">
                    <PendingRequests />
                </div>
            </div>
        </div>
    );
}
