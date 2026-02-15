import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import { products, productShowcases, stats } from '../data/landingPageData';
import ProductCardComponent from '../components/landing/ProductCardComponent';
import ProductShowcaseCard from '../components/landing/ProductShowcaseCard';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
}

export default function LandingPage() {
    const { darkMode, toggleTheme } = useTheme();
    const greeting = getGreeting();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="clean-bg text-slate-600 transition-colors duration-500 dark:text-slate-100 min-h-screen min-h-svh flex flex-col">
            {/* Background Blobs - Smaller on mobile */}
            <div className="blob bg-cyan-300/40 dark:bg-cyan-600/20 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full top-[-10%] left-[-10%]"></div>
            <div className="blob bg-violet-300/40 dark:bg-violet-600/20 w-[250px] sm:w-[350px] lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[500px] rounded-full top-[50%] right-[-5%]" style={{ animationDelay: '-3s' }}></div>
            <div className="blob bg-rose-300/30 dark:bg-rose-600/20 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bottom-[-5%] left-[30%]" style={{ animationDelay: '-6s' }}></div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 dark:bg-slate-900/80 dark:border-slate-800/50 transition-colors">
                <div className="mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between h-14 sm:h-16 items-center">
                        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 bg-gradient-to-br from-cyan-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <i className="fa-solid fa-cubes text-white text-sm sm:text-lg"></i>
                            </div>
                            <div>
                                <span className="block font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">SAVIOR</span>
                                <span className="text-[9px] sm:text-[10px] font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">HRMIS Portal</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-xl bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transition-all border border-white/60 dark:border-slate-700/50 text-slate-500 dark:text-slate-400 active:scale-95"
                            >
                                {darkMode ? (
                                    <i className="fa-solid fa-sun text-base sm:text-lg text-amber-400"></i>
                                ) : (
                                    <i className="fa-solid fa-moon text-base sm:text-lg text-slate-500"></i>
                                )}
                            </button>

                            {/* Notifications */}
                            <button className="hidden sm:flex relative p-2 sm:p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all hover:scale-110">
                                <i className="fa-regular fa-bell text-base sm:text-lg"></i>
                                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="sm:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95"
                            >
                                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                            </button>

                            {/* User Profile */}
                            <div className="hidden sm:flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 border-l border-slate-200/70 dark:border-slate-700/70">
                                <div className="text-right hidden md:block">
                                    <p className="text-[10px] sm:text-xs font-medium text-slate-400 dark:text-slate-500">{greeting}</p>
                                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none">Admin User</p>
                                </div>
                                <div className="relative group cursor-pointer">
                                    <img
                                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-lg object-cover group-hover:ring-cyan-400 transition-all duration-300"
                                        src="https://i.pravatar.cc/150?img=11"
                                        alt="User Avatar"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`sm:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-48 py-3' : 'max-h-0 py-0'}`}>
                    <div className="px-3 space-y-2">
                        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <img className="h-9 w-9 rounded-full" src="https://i.pravatar.cc/150?img=11" alt="User" loading="lazy" />
                            <div>
                                <p className="text-xs font-medium text-slate-400">{greeting}</p>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">Admin User</p>
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm"
                            />
                            <i className="fa-solid fa-magnifying-glass text-slate-400 absolute left-3 top-2.5 text-xs"></i>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 w-full relative z-10">
                {/* Hero Section */}
                <div className="mb-4 sm:mb-6 text-center mt-4 sm:mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 mb-4 sm:mb-6"
                    >
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">All Systems Operational</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4"
                    >
                        Application <span className="gradient-text-animated">Hub</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-sm sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-4"
                    >
                        Access all your HR management tools in one place. Select an application to get started.
                    </motion.p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            className={`glass-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 stat-card cursor-pointer hover:shadow-lg active:scale-[0.98]`}
                        >
                            <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-md sm:rounded-lg bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md ${stat.shadowColor}`}>
                                <i className={`fa-solid ${stat.icon} text-sm sm:text-lg`}></i>
                            </div>
                            <div>
                                <p className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-800 dark:text-white">{stat.value}</p>
                                <p className="text-[9px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {products.map((product, index) => (
                        <ProductCardComponent key={product.id} product={product} index={index} />
                    ))}
                </div>

                {/* Explore Our Products Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 lg:mb-12"
                >
                    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
                        <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-3 sm:mb-4">
                            <i className="fa-solid fa-sparkles text-violet-500 text-xs sm:text-sm"></i>
                            <span className="text-[10px] sm:text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">Explore Our Products</span>
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 sm:mb-3">
                            Powerful <span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">HR Solutions</span>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto px-4">
                            Discover the complete suite of tools designed to streamline your HR operations and boost productivity.
                        </p>
                    </div>

                    {productShowcases.map((product) => (
                        <ProductShowcaseCard key={product.name} product={product} />
                    ))}
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="mt-auto py-4 sm:py-6 lg:py-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-gray-100 dark:border-slate-800 relative z-10">
                <div className="flex flex-col gap-2 sm:gap-4 px-4">
                    <p>© 2026 Savior HRMIS. All rights reserved.</p>
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        <a href="#" className="hover:text-cyan-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cyan-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-cyan-600 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
