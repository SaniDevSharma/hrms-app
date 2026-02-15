import { useState, useEffect } from 'react';
import StatCard from '../components/ui/StatCard';
import GlassCard from '../components/ui/GlassCard';
import Charts from '../components/dashboard/Charts';
import LiveFeed from '../components/dashboard/LiveFeed';
import PendingRequests from '../components/dashboard/PendingRequests';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const greeting = getGreeting();

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatDateLong = (date: Date) => {
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
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Welcome Banner */}
            <GlassCard className="overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col gap-4">
                    {/* Top Row - Greeting and Time */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white">
                                {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">John!</span>
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 sm:mt-2">
                                Here's what's happening with your team today.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="text-left sm:text-right">
                                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                                    <span className="hidden sm:inline">{formatDateLong(currentTime)}</span>
                                    <span className="sm:hidden">{formatDate(currentTime)}</span>
                                </p>
                                <p className="text-lg sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">{formatTime(currentTime)}</p>
                            </div>
                            <div className="h-10 w-10 sm:h-12 lg:h-14 sm:w-12 lg:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                                <i className="fa-solid fa-calendar-days text-base sm:text-lg lg:text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={stat.title} {...stat} stagger={index + 1} />
                ))}
            </div>

            {/* Charts Section */}
            <Charts />

            {/* Live Feed & Requests */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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
