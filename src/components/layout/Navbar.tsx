import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import menuData from '../../data/menuData.json';
import type { MenuData } from '../../types';

const menu = menuData as MenuData;

export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50">
            <div className="w-full bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/50 shadow-[0_4px_30px_rgb(0,0,0,0.04)] px-6 py-3 flex justify-between items-center transition-colors duration-300">
                {/* Logo */}
                <Link to="/home" className="flex items-center gap-3 group cursor-pointer">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                        S
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 dark:text-white text-lg tracking-tight leading-none">SAVIOR</span>
                        <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">Time Office</span>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="xl:hidden h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                    <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden xl:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-white/60 dark:border-slate-700/50">
                    {menu.mainMenu.map((category) => (
                        <div key={category.label} className="dropdown relative">
                            <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200 flex items-center gap-2">
                                <i className={`fa-solid ${category.icon} text-xs opacity-70`}></i>
                                {category.label}
                                <i className="fa-solid fa-chevron-down text-[10px] opacity-50"></i>
                            </button>
                            <div className="dropdown-menu">
                                <div className="py-2">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.href}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                                        >
                                            <i className={`fa-solid ${item.icon} text-xs opacity-60`}></i>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {menu.quickLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${location.pathname === link.href
                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                                    : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-white/80 dark:hover:bg-slate-700/80'
                                }`}
                        >
                            <i className={`fa-solid ${link.icon} text-xs ${location.pathname === link.href ? '' : 'opacity-70'}`}></i>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* User Actions */}
                <div className="hidden xl:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                    >
                        <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>

                    {/* Notifications */}
                    <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 relative">
                        <i className="fa-solid fa-bell"></i>
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">3</span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                            JD
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">John Doe</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`xl:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-xl ${mobileMenuOpen ? 'open' : ''}`}
            >
                <div className="p-4 space-y-2">
                    {menu.mainMenu.map((category) => (
                        <div key={category.label} className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">{category.label}</p>
                            {category.items.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                                >
                                    <i className={`fa-solid ${item.icon} text-xs opacity-60`}></i>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    ))}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg"
                        >
                            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-xs`}></i>
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
