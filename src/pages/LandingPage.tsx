import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface ProductCard {
    id: string;
    name: string;
    subtitle: string;
    icon: string;
    color: string;
    shadowColor: string;
    route: string;
    features: { label: string; bgClass: string; textClass: string }[];
    images: string[];
}

interface ProductShowcase {
    name: string;
    subtitle: string;
    icon: string;
    color: string;
    shadowColor: string;
    textColor: string;
    route: string;
    description: string;
    featureColor: string;
    features: { icon: string; title: string; desc: string }[];
    reverse?: boolean;
}

const products: ProductCard[] = [
    {
        id: 'time-office',
        name: 'Time Office',
        subtitle: 'Attendance & Scheduling',
        icon: 'fa-regular fa-clock',
        color: 'from-cyan-500 to-blue-600',
        shadowColor: 'shadow-cyan-500/30',
        route: '/dashboard',
        features: [
            { label: 'Shift Roster', bgClass: 'bg-cyan-50 dark:bg-cyan-900/30', textClass: 'text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-800/50' },
            { label: 'Biometrics', bgClass: 'bg-cyan-50 dark:bg-cyan-900/30', textClass: 'text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-800/50' },
            { label: 'Leave Mgmt', bgClass: 'bg-cyan-50 dark:bg-cyan-900/30', textClass: 'text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-800/50' },
            { label: 'Analytics', bgClass: 'bg-cyan-50 dark:bg-cyan-900/30', textClass: 'text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'payroll',
        name: 'Payroll',
        subtitle: 'Salary & Compliance',
        icon: 'fa-solid fa-indian-rupee-sign',
        color: 'from-emerald-500 to-green-600',
        shadowColor: 'shadow-emerald-500/30',
        route: '/payroll',
        features: [
            { label: 'Salary Process', bgClass: 'bg-emerald-50 dark:bg-emerald-900/30', textClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50' },
            { label: 'Payslip Gen', bgClass: 'bg-emerald-50 dark:bg-emerald-900/30', textClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50' },
            { label: 'TDS / Tax', bgClass: 'bg-emerald-50 dark:bg-emerald-900/30', textClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50' },
            { label: 'Bank Transfer', bgClass: 'bg-emerald-50 dark:bg-emerald-900/30', textClass: 'text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1554224155-98406852d0a7?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'aerm',
        name: 'AERM',
        subtitle: 'Employee Relations',
        icon: 'fa-solid fa-users-gear',
        color: 'from-violet-500 to-purple-600',
        shadowColor: 'shadow-violet-500/30',
        route: '/aerm',
        features: [
            { label: 'Onboarding', bgClass: 'bg-violet-50 dark:bg-violet-900/30', textClass: 'text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50' },
            { label: 'Appraisals', bgClass: 'bg-violet-50 dark:bg-violet-900/30', textClass: 'text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50' },
            { label: 'Training', bgClass: 'bg-violet-50 dark:bg-violet-900/30', textClass: 'text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50' },
            { label: 'Exit Process', bgClass: 'bg-violet-50 dark:bg-violet-900/30', textClass: 'text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'visitor',
        name: 'Visitor',
        subtitle: 'Gate Management',
        icon: 'fa-solid fa-id-badge',
        color: 'from-amber-500 to-orange-600',
        shadowColor: 'shadow-amber-500/30',
        route: '/visitor',
        features: [
            { label: 'Gate Pass', bgClass: 'bg-amber-50 dark:bg-amber-900/30', textClass: 'text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/50' },
            { label: 'Appointments', bgClass: 'bg-amber-50 dark:bg-amber-900/30', textClass: 'text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/50' },
            { label: 'Material Track', bgClass: 'bg-amber-50 dark:bg-amber-900/30', textClass: 'text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'helpdesk',
        name: 'Help Desk',
        subtitle: 'IT & Facility Support',
        icon: 'fa-solid fa-headset',
        color: 'from-rose-500 to-pink-600',
        shadowColor: 'shadow-rose-500/30',
        route: '/helpdesk',
        features: [
            { label: 'Ticketing', bgClass: 'bg-rose-50 dark:bg-rose-900/30', textClass: 'text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-800/50' },
            { label: 'IT Support', bgClass: 'bg-rose-50 dark:bg-rose-900/30', textClass: 'text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-800/50' },
            { label: 'SLA Tracking', bgClass: 'bg-rose-50 dark:bg-rose-900/30', textClass: 'text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
        ],
    },
    {
        id: 'travel',
        name: 'Travel Desk',
        subtitle: 'Trip & Expense',
        icon: 'fa-solid fa-plane-departure',
        color: 'from-teal-500 to-cyan-600',
        shadowColor: 'shadow-teal-500/30',
        route: '/travel',
        features: [
            { label: 'Trip Request', bgClass: 'bg-teal-50 dark:bg-teal-900/30', textClass: 'text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-800/50' },
            { label: 'Expense Claim', bgClass: 'bg-teal-50 dark:bg-teal-900/30', textClass: 'text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-800/50' },
            { label: 'Approvals', bgClass: 'bg-teal-50 dark:bg-teal-900/30', textClass: 'text-teal-700 dark:text-teal-300 border-teal-100 dark:border-teal-800/50' },
        ],
        images: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=80',
        ],
    },
];

const productShowcases: ProductShowcase[] = [
    {
        name: 'Time Office',
        subtitle: 'Attendance & Scheduling',
        icon: 'fa-regular fa-clock',
        color: 'from-cyan-500 to-blue-600',
        shadowColor: 'shadow-cyan-500/30',
        textColor: 'text-cyan-600 dark:text-cyan-400',
        route: '/dashboard',
        description: 'Comprehensive time tracking solution with shift roster management, biometric integration, leave management, and powerful analytics for complete workforce control.',
        featureColor: 'text-cyan-500',
        features: [
            { icon: 'fa-calendar-days', title: 'Shift Roster', desc: 'Flexible scheduling & rotation' },
            { icon: 'fa-fingerprint', title: 'Biometrics', desc: 'Fingerprint & face recognition' },
            { icon: 'fa-calendar-check', title: 'Leave Mgmt', desc: 'Complete leave tracking' },
            { icon: 'fa-chart-line', title: 'Analytics', desc: 'Attendance insights' },
            { icon: 'fa-clock-rotate-left', title: 'Overtime Tracking', desc: 'Auto OT calculations' },
            { icon: 'fa-bell', title: 'Smart Alerts', desc: 'Late/absence notifications' },
        ],
    },
    {
        name: 'Payroll',
        subtitle: 'Salary & Compliance',
        icon: 'fa-solid fa-indian-rupee-sign',
        color: 'from-emerald-500 to-green-600',
        shadowColor: 'shadow-emerald-500/30',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        route: '/payroll',
        description: 'End-to-end payroll processing with salary calculations, payslip generation, TDS/tax compliance, and seamless bank transfer integration for timely disbursements.',
        featureColor: 'text-emerald-500',
        reverse: true,
        features: [
            { icon: 'fa-gear', title: 'Salary Process', desc: 'One-click payroll run' },
            { icon: 'fa-file-invoice-dollar', title: 'Payslip Gen', desc: 'Auto PDF generation' },
            { icon: 'fa-landmark', title: 'TDS / Tax', desc: 'Statutory compliance' },
            { icon: 'fa-building-columns', title: 'Bank Transfer', desc: 'Direct salary credit' },
            { icon: 'fa-shield-halved', title: 'PF & ESI', desc: 'Auto deductions' },
            { icon: 'fa-chart-pie', title: 'Cost Analytics', desc: 'Salary insights' },
        ],
    },
    {
        name: 'AERM',
        subtitle: 'Employee Relations',
        icon: 'fa-solid fa-users-gear',
        color: 'from-violet-500 to-purple-600',
        shadowColor: 'shadow-violet-500/30',
        textColor: 'text-violet-600 dark:text-violet-400',
        route: '/aerm',
        description: 'Complete employee lifecycle management from onboarding to exit. Handle appraisals, training programs, and maintain strong employee relations throughout their journey.',
        featureColor: 'text-violet-500',
        features: [
            { icon: 'fa-user-plus', title: 'Onboarding', desc: 'Smooth new hire process' },
            { icon: 'fa-star', title: 'Appraisals', desc: 'Performance reviews' },
            { icon: 'fa-graduation-cap', title: 'Training', desc: 'Skill development' },
            { icon: 'fa-door-open', title: 'Exit Process', desc: 'Smooth offboarding' },
            { icon: 'fa-folder-open', title: 'Document Mgmt', desc: 'Secure file storage' },
            { icon: 'fa-comments', title: 'Feedback System', desc: 'Employee voice platform' },
        ],
    },
    {
        name: 'Visitor',
        subtitle: 'Gate Management',
        icon: 'fa-solid fa-id-badge',
        color: 'from-amber-500 to-orange-600',
        shadowColor: 'shadow-amber-500/30',
        textColor: 'text-amber-600 dark:text-amber-400',
        route: '/visitor',
        description: 'Streamlined visitor management with digital gate passes, appointment scheduling, material tracking, and comprehensive security protocols for your premises.',
        featureColor: 'text-amber-500',
        reverse: true,
        features: [
            { icon: 'fa-qrcode', title: 'Gate Pass', desc: 'Digital visitor badges' },
            { icon: 'fa-calendar-plus', title: 'Appointments', desc: 'Pre-register visitors' },
            { icon: 'fa-boxes-stacked', title: 'Material Track', desc: 'In/out movement logs' },
            { icon: 'fa-shield-halved', title: 'Security Checks', desc: 'ID verification' },
            { icon: 'fa-bell', title: 'Host Alerts', desc: 'Instant notifications' },
            { icon: 'fa-file-lines', title: 'Visit Reports', desc: 'Complete visit history' },
        ],
    },
    {
        name: 'Help Desk',
        subtitle: 'IT & Facility Support',
        icon: 'fa-solid fa-headset',
        color: 'from-rose-500 to-pink-600',
        shadowColor: 'shadow-rose-500/30',
        textColor: 'text-rose-600 dark:text-rose-400',
        route: '/helpdesk',
        description: 'Comprehensive ticketing system for IT support and facility management. Track issues, manage SLAs, and ensure timely resolution with powerful automation.',
        featureColor: 'text-rose-500',
        features: [
            { icon: 'fa-ticket', title: 'Ticketing', desc: 'Issue tracking system' },
            { icon: 'fa-desktop', title: 'IT Support', desc: 'Hardware & software help' },
            { icon: 'fa-stopwatch', title: 'SLA Tracking', desc: 'Response time metrics' },
            { icon: 'fa-building', title: 'Facility Mgmt', desc: 'Maintenance requests' },
            { icon: 'fa-robot', title: 'Auto-Assignment', desc: 'Smart ticket routing' },
            { icon: 'fa-chart-bar', title: 'Performance Reports', desc: 'Resolution analytics' },
        ],
    },
    {
        name: 'Travel Desk',
        subtitle: 'Trip & Expense',
        icon: 'fa-solid fa-plane-departure',
        color: 'from-teal-500 to-cyan-600',
        shadowColor: 'shadow-teal-500/30',
        textColor: 'text-teal-600 dark:text-teal-400',
        route: '/travel',
        description: 'Streamlined business travel management with trip requests, expense claims, and multi-level approval workflows for hassle-free corporate travel.',
        featureColor: 'text-teal-500',
        reverse: true,
        features: [
            { icon: 'fa-route', title: 'Trip Request', desc: 'Easy travel planning' },
            { icon: 'fa-receipt', title: 'Expense Claim', desc: 'Receipt scanning' },
            { icon: 'fa-check-double', title: 'Approvals', desc: 'Multi-level workflow' },
            { icon: 'fa-wallet', title: 'Advance Requests', desc: 'Travel cash advances' },
            { icon: 'fa-scale-balanced', title: 'Policy Compliance', desc: 'Auto policy checks' },
            { icon: 'fa-file-lines', title: 'Trip Reports', desc: 'Post-trip summaries' },
        ],
    },
];

const stats = [
    { value: '6', label: 'Active Apps', icon: 'fa-cube', color: 'from-cyan-500 to-cyan-600', shadowColor: 'shadow-cyan-500/30' },
    { value: '450+', label: 'Active Users', icon: 'fa-users', color: 'from-emerald-500 to-emerald-600', shadowColor: 'shadow-emerald-500/30' },
    { value: '99.9%', label: 'Uptime', icon: 'fa-chart-line', color: 'from-violet-500 to-violet-600', shadowColor: 'shadow-violet-500/30' },
    { value: 'Fast', label: 'Performance', icon: 'fa-bolt', color: 'from-amber-500 to-orange-500', shadowColor: 'shadow-amber-500/30' },
];

function ProductCardComponent({ product, index }: { product: ProductCard; index: number }) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % product.images.length);
        }, 4000 + index * 500);
        return () => clearInterval(interval);
    }, [product.images.length, index]);

    return (
        <div className={`card-hover glass-card rounded-3xl flex flex-col overflow-hidden animate-slide-up stagger-${index + 1} group relative`}>
            <div className="card-gradient absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"></div>

            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-700/50 relative">
                <div className="flex items-center gap-4">
                    <div className={`card-icon h-12 w-12 bg-gradient-to-br ${product.color} rounded-2xl text-white flex items-center justify-center shadow-lg ${product.shadowColor} transition-transform duration-300`}>
                        <i className={`${product.icon} text-xl`}></i>
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg">{product.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{product.subtitle}</p>
                    </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase">Active</span>
            </div>

            {/* Image Slider */}
            <div className="relative w-full h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="slides w-full h-full">
                    {product.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className={`slide absolute w-full h-full object-cover ${i === activeSlide ? 'active-slide' : 'inactive-slide'}`}
                            alt={product.name}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <Link
                    to={product.route}
                    className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                >
                    <span className={`px-8 py-3 bg-gradient-to-r ${product.color} text-white rounded-full text-sm font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 hover:scale-105`}>
                        <span>Launch App</span> <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </Link>
            </div>

            {/* Features */}
            <div className="p-6 flex-grow relative">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 font-bold uppercase tracking-widest">Key Features</p>
                <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                        <span key={feature.label} className={`feature-card px-3 py-1.5 rounded-lg ${feature.bgClass} ${feature.textClass} text-xs font-semibold border`}>
                            {feature.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProductShowcaseCard({ product }: { product: ProductShowcase }) {
    return (
        <div className="glass-card rounded-3xl p-8 mb-6 overflow-hidden relative group">
            <div className={`absolute ${product.reverse ? 'top-0 left-0 -translate-x-1/2' : 'top-0 right-0 translate-x-1/2'} -translate-y-1/2 w-64 h-64 bg-gradient-to-br ${product.color}/10 rounded-full blur-3xl`}></div>
            <div className={`flex flex-col ${product.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 relative z-10`}>
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`float-animation h-14 w-14 bg-gradient-to-br ${product.color} rounded-2xl text-white flex items-center justify-center shadow-lg ${product.shadowColor}`}>
                            <i className={`${product.icon} text-2xl`}></i>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{product.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{product.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{product.description}</p>
                    <Link to={product.route} className={`inline-flex items-center gap-2 ${product.textColor} font-bold hover:underline`}>
                        Launch App <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className="lg:w-2/3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {product.features.map((feature) => (
                            <div key={feature.title} className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                <i className={`fa-solid ${feature.icon} ${product.featureColor} text-xl mb-2`}></i>
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{feature.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LandingPage() {
    const { darkMode, toggleTheme } = useTheme();
    const [greeting, setGreeting] = useState('Welcome');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning,');
        else if (hour < 18) setGreeting('Good Afternoon,');
        else setGreeting('Good Evening,');
    }, []);

    return (
        <div className="clean-bg text-slate-600 transition-colors duration-500 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Background Blobs */}
            <div className="blob bg-cyan-300/40 dark:bg-cyan-600/20 w-[600px] h-[600px] rounded-full top-[-10%] left-[-10%]"></div>
            <div className="blob bg-violet-300/40 dark:bg-violet-600/20 w-[500px] h-[500px] rounded-full top-[50%] right-[-5%]" style={{ animationDelay: '-3s' }}></div>
            <div className="blob bg-rose-300/30 dark:bg-rose-600/20 w-[400px] h-[400px] rounded-full bottom-[-5%] left-[30%]" style={{ animationDelay: '-6s' }}></div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-800/50 transition-colors">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <i className="fa-solid fa-cubes text-white text-lg"></i>
                            </div>
                            <div>
                                <span className="block font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">SAVIOR</span>
                                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">HRMIS Portal</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex relative">
                                <input
                                    type="text"
                                    placeholder="Search applications..."
                                    className="w-64 pl-10 pr-4 py-2.5 bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                                />
                                <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3.5 top-3"></i>
                            </div>

                            <button
                                onClick={toggleTheme}
                                className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all border border-white/60 dark:border-slate-700/50 text-slate-500 dark:text-slate-400"
                            >
                                {darkMode ? (
                                    <i className="fa-solid fa-sun text-lg text-amber-400"></i>
                                ) : (
                                    <i className="fa-solid fa-moon text-lg text-slate-500"></i>
                                )}
                            </button>

                            <button className="relative p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all hover:scale-110">
                                <i className="fa-regular fa-bell text-lg"></i>
                                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200/70 dark:border-slate-700/70">
                                <div className="text-right hidden md:block">
                                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{greeting}</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Admin User</p>
                                </div>
                                <div className="relative group cursor-pointer">
                                    <img
                                        className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-lg object-cover group-hover:ring-cyan-400 transition-all duration-300"
                                        src="https://i.pravatar.cc/150?img=11"
                                        alt="User Avatar"
                                    />
                                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full relative z-10">
                {/* Hero Section */}
                <div className="mb-4 text-center animate-fade-in mt-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">All Systems Operational</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Application <span className="gradient-text-animated">Hub</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Access all your HR management tools in one place. Select an application to get started.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className={`glass-card rounded-xl p-3 flex items-center gap-3 animate-slide-up stagger-${index + 1} stat-card cursor-pointer hover:shadow-lg`}>
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md ${stat.shadowColor}`}>
                                <i className={`fa-solid ${stat.icon} text-lg`}></i>
                            </div>
                            <div>
                                <p className="text-xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
                                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCardComponent key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* Explore Our Products Section */}
                <section className="mt-16 mb-12 animate-fade-in">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-4">
                            <i className="fa-solid fa-sparkles text-violet-500"></i>
                            <span className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">Explore Our Products</span>
                        </span>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                            Powerful <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">HR Solutions</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Discover the complete suite of tools designed to streamline your HR operations and boost productivity.
                        </p>
                    </div>

                    {productShowcases.map((product) => (
                        <ProductShowcaseCard key={product.name} product={product} />
                    ))}
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-auto py-8 text-center text-sm text-slate-500 dark:text-slate-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-gray-100 dark:border-slate-800 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <p>© 2026 Savior HRMIS. All rights reserved.</p>
                    <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-cyan-600 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
