import { type ReactNode } from 'react';

interface MasterToolbarProps {
    title: string;
    subtitle: string;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    addButtonLabel: string;
    onAdd: () => void;
    children?: ReactNode;
}

export default function MasterToolbar({
    title,
    subtitle,
    searchTerm,
    onSearchChange,
    searchPlaceholder = 'Search...',
    addButtonLabel,
    onAdd,
    children,
}: MasterToolbarProps) {
    return (
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
                <p className="text-slate-500 dark:text-slate-400">{subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-center">
                <div className="relative w-full sm:w-64">
                    <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium placeholder:font-normal"
                    />
                </div>
                {children}
                <button
                    onClick={onAdd}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <i className="fa-solid fa-plus"></i>
                    {addButtonLabel}
                </button>
            </div>
        </div>
    );
}
