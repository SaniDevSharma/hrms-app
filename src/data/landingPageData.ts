export interface ProductCard {
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

export interface ProductShowcase {
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

export const products: ProductCard[] = [
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
        route: 'http://localhost:5174/',
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
        route: 'http://localhost:5173/',
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

export const productShowcases: ProductShowcase[] = [
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
        route: 'http://localhost:5174/',
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
        route: 'http://localhost:5173/',
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

export const stats = [
    { value: '6', label: 'Active Apps', icon: 'fa-cube', color: 'from-cyan-500 to-cyan-600', shadowColor: 'shadow-cyan-500/30' },
    { value: '450+', label: 'Active Users', icon: 'fa-users', color: 'from-emerald-500 to-emerald-600', shadowColor: 'shadow-emerald-500/30' },
    { value: '99.9%', label: 'Uptime', icon: 'fa-chart-line', color: 'from-violet-500 to-violet-600', shadowColor: 'shadow-violet-500/30' },
    { value: 'Fast', label: 'Performance', icon: 'fa-bolt', color: 'from-amber-500 to-orange-500', shadowColor: 'shadow-amber-500/30' },
];
