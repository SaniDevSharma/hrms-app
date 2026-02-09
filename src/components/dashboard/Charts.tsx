import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '../../context/ThemeContext';
import GlassCard from '../ui/GlassCard';

export default function Charts() {
    const { darkMode } = useTheme();
    const [key, setKey] = useState(0);

    // Force re-render when theme changes
    useEffect(() => {
        setKey(prev => prev + 1);
    }, [darkMode]);

    const textColor = darkMode ? '#cbd5e1' : '#64748b';
    const gridColor = darkMode ? '#334155' : '#e2e8f0';

    const attendanceOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'area',
            toolbar: { show: false },
            background: 'transparent',
        },
        colors: ['#06b6d4', '#8b5cf6'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.1,
            },
        },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: { style: { colors: textColor } },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: { style: { colors: textColor } },
        },
        grid: { borderColor: gridColor, strokeDashArray: 4 },
        legend: {
            labels: { colors: textColor },
            position: 'top',
        },
        tooltip: { theme: darkMode ? 'dark' : 'light' },
    };

    const attendanceSeries = [
        { name: 'Present', data: [1150, 1180, 1120, 1200, 1089, 980, 850] },
        { name: 'Absent', data: [97, 67, 127, 47, 158, 267, 397] },
    ];

    const statusOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'donut',
            background: 'transparent',
        },
        labels: ['Present', 'On Leave', 'Late', 'Absent'],
        colors: ['#10b981', '#f59e0b', '#f97316', '#ef4444'],
        legend: {
            position: 'bottom',
            labels: { colors: textColor },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            color: textColor,
                            formatter: () => '1,247',
                        },
                    },
                },
            },
        },
        dataLabels: { enabled: false },
        tooltip: { theme: darkMode ? 'dark' : 'light' },
    };

    const statusSeries = [1089, 58, 23, 77];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-2" stagger={5}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Weekly Attendance</h3>
                    <select className="text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 focus:ring-cyan-500">
                        <option>This Week</option>
                        <option>Last Week</option>
                        <option>This Month</option>
                    </select>
                </div>
                <Chart key={`attendance-${key}`} options={attendanceOptions} series={attendanceSeries} type="area" height={280} />
            </GlassCard>

            <GlassCard stagger={5}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Today's Status</h3>
                    <button className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
                        View Details
                    </button>
                </div>
                <Chart key={`status-${key}`} options={statusOptions} series={statusSeries} type="donut" height={280} />
            </GlassCard>
        </div>
    );
}
