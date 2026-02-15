import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
    const navigate = useNavigate();
    const [sliderIndex, setSliderIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prev) => (prev + 1) % 3);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate brief auth delay for visual feedback
        setTimeout(() => navigate('/home'), 600);
    };

    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
            title: 'Analytics Dashboard',
            description: 'Get real-time insights into attendance, productivity, and workforce trends with intuitive visual reports.'
        },
        {
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
            title: 'Employee Management',
            description: 'Manage employee profiles, roles, shifts, and approvals seamlessly from a single unified platform.'
        },
        {
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
            title: 'Payroll Systems',
            description: 'Automate salary calculations, deductions, compliance, and payslip generation with complete accuracy.'
        }
    ];

    return (
        <div className="min-h-screen min-h-svh flex items-center justify-center p-3 sm:p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
            {/* Background Blobs */}
            <div className="blob bg-cyan-300/50 dark:bg-cyan-600/20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full -top-[10%] -left-[10%]"></div>
            <div className="blob bg-blue-300/50 dark:bg-blue-600/20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full -bottom-[10%] -right-[10%]" style={{ animationDelay: '2s' }}></div>
            <div className="blob bg-violet-200/40 dark:bg-violet-700/15 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full top-[40%] left-[20%]" style={{ animationDelay: '4s' }}></div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] flex flex-col lg:flex-row overflow-hidden relative z-10 border border-white/60 dark:border-slate-700/50"
            >
                {/* Left Panel */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-50/80 to-cyan-50/40 dark:from-slate-800/50 dark:to-slate-900/50 border-b lg:border-b-0 lg:border-r border-slate-200/50 dark:border-slate-700/50">
                    {/* Logo */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="flex items-center gap-3 mb-4 sm:mb-6"
                        >
                            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 text-sm sm:text-base">
                                <i className="fa-solid fa-cubes"></i>
                            </div>
                            <div>
                                <span className="block font-extrabold text-slate-800 dark:text-white text-base sm:text-lg leading-none">SAVIOR</span>
                                <span className="text-[10px] sm:text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">HRMIS Portal</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                                Welcome to your
                                <span className="gradient-text-animated"> Digital Workspace.</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium mt-2 leading-relaxed">
                                Manage your work seamlessly with the help of Next Gen Access & Attendance Solutions.
                            </p>
                        </motion.div>
                    </div>

                    {/* Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="hidden sm:block relative w-full h-48 lg:h-60 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border border-white/50 dark:border-slate-700/50 group mt-4 lg:mt-0"
                    >
                        <div
                            className="slide-track flex h-full w-full"
                            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div key={index} className="min-w-full h-full relative">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="block object-cover w-full h-full brightness-90"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                        <h3 className="text-sm lg:text-base font-bold">{slide.title}</h3>
                                        <p className="mt-1 text-[10px] lg:text-xs text-slate-200 leading-snug max-w-md line-clamp-2">{slide.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Slide Indicators */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSliderIndex(index)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === sliderIndex ? 'w-6 bg-white shadow-md' : 'w-1.5 bg-white/50 hover:bg-white/70'}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer - Hidden on mobile */}
                    <div className="hidden lg:flex items-center justify-center gap-4 mt-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                            <i className="fa-solid fa-cubes text-sm"></i>
                        </div>
                        <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                            <p className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">STJ Electronics Pvt. Ltd.</p>
                            <p className="mt-0.5 leading-tight">X-51, Okhla Industrial Area,<br />Phase-2, New Delhi - 110 020</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col bg-white/60 dark:bg-slate-900/40">
                    <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mb-6 sm:mb-8"
                        >
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-white">Sign In</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your details to continue.</p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="space-y-4 sm:space-y-5"
                            onSubmit={handleSubmit}
                        >
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Employee ID</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-user text-slate-400 group-focus-within:text-cyan-500 transition-colors text-sm"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-all text-sm shadow-sm"
                                        placeholder="e.g. EMP-2024"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-lock text-slate-400 group-focus-within:text-cyan-500 transition-colors text-sm"></i>
                                    </div>
                                    <input
                                        type="password"
                                        className="block w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-all text-sm shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1">
                                <label className="flex items-center cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 text-cyan-600 rounded border-slate-300 dark:border-slate-600 focus:ring-cyan-500 bg-white dark:bg-slate-800" />
                                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-70 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-right-to-bracket"></i>
                                        Secure Login
                                    </>
                                )}
                            </button>
                        </motion.form>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 dark:border-slate-800 text-center"
                    >
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-2 uppercase tracking-wide">Need Assistance?</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <i className="fa-solid fa-phone text-cyan-500 text-[10px]"></i>
                                +91-11-4981 6000
                            </span>
                            <span className="hidden sm:inline text-slate-300 dark:text-slate-600">|</span>
                            <a href="mailto:support@saviorstj.com" className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline">
                                <i className="fa-solid fa-envelope text-[10px]"></i>
                                support@saviorstj.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
