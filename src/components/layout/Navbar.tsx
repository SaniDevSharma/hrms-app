import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import menuData from '../../data/menuData.json';
import type { MenuData } from '../../types';

const menu = menuData as MenuData;

export default function Navbar() {
    const { darkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();

    const toggleSubmenu = (label: string) => {
        setExpandedMenus(prev =>
            prev.includes(label)
                ? prev.filter(item => item !== label)
                : [...prev, label]
        );
    };

    const isExpanded = (label: string) => expandedMenus.includes(label);

    // Get display name and initials from Keycloak user profile
    const displayName = user?.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : user?.username || 'User';
    const initials = user?.firstName
        ? `${user.firstName[0]}${(user.lastName || '')[0] || ''}`.toUpperCase()
        : 'U';
    const email = user?.email || '';

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="sticky top-0 z-50">
            <div className="w-full bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/50 shadow-[0_4px_30px_rgb(0,0,0,0.04)] px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 flex justify-between items-center transition-colors duration-300">
                {/* Logo */}
                <Link to="/home" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                    <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                        S
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-slate-800 dark:text-white text-base sm:text-lg tracking-tight leading-none">SAVIOR</span>
                        <span className="text-[9px] sm:text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">Time Office</span>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="xl:hidden h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
                >
                    <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-base sm:text-lg`}></i>
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
                <div className="hidden xl:flex items-center gap-3 lg:gap-4">
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
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center badge-pulse">3</span>
                    </button>

                    {/* User Profile with Dropdown */}
                    <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                                {initials}
                            </div>
                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-none">{displayName}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                            </div>
                            <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}></i>
                        </button>

                        {/* User Dropdown Menu */}
                        {userMenuOpen && (
                            <>
                                {/* Backdrop to close menu when clicking outside */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setUserMenuOpen(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-slide-up">
                                    <div className="p-3 border-b border-slate-100 dark:border-slate-700">
                                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{displayName}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            to="/profile"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-all"
                                        >
                                            <i className="fa-solid fa-user text-xs opacity-60"></i>
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-all"
                                        >
                                            <i className="fa-solid fa-gear text-xs opacity-60"></i>
                                            Settings
                                        </Link>
                                        <div className="my-1 border-t border-slate-100 dark:border-slate-700"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                        >
                                            <i className="fa-solid fa-right-from-bracket text-xs"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`xl:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-3 sm:p-4 space-y-2 max-h-[75vh] overflow-y-auto">
                    {/* User Profile in Mobile */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-3">
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                                {initials}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">{displayName}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="h-9 w-9 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors active:scale-95"
                            title="Logout"
                        >
                            <i className="fa-solid fa-right-from-bracket text-sm"></i>
                        </button>
                    </div>

                    {/* Cascading Menu Items */}
                    {menu.mainMenu.map((category) => (
                        <div key={category.label} className="space-y-1">
                            {/* Category Header - Clickable to expand/collapse */}
                            <button
                                onClick={() => toggleSubmenu(category.label)}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-[0.99]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                                        <i className={`fa-solid ${category.icon} text-xs`}></i>
                                    </div>
                                    <span>{category.label}</span>
                                </div>
                                <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform duration-300 ${isExpanded(category.label) ? 'rotate-180' : ''}`}></i>
                            </button>

                            {/* Submenu Items - Animated expand/collapse */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded(category.label) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="ml-4 pl-4 border-l-2 border-cyan-500/30 space-y-1 py-1">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.label}
                                            to={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all active:scale-[0.98]"
                                        >
                                            <i className={`fa-solid ${item.icon} text-xs opacity-60 w-4`}></i>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Quick Links in Mobile */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Quick Links</p>
                        {menu.quickLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all active:scale-[0.98] ${location.pathname === link.href
                                    ? 'bg-cyan-600 text-white'
                                    : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <i className={`fa-solid ${link.icon} text-xs w-4`}></i>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                        <button
                            onClick={toggleTheme}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg active:scale-[0.98] transition-all"
                        >
                            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} text-xs`}></i>
                            {darkMode ? 'Light' : 'Dark'}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg active:scale-[0.98] transition-all relative">
                            <i className="fa-solid fa-bell text-xs"></i>
                            Alerts
                            <span className="h-5 w-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">3</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
