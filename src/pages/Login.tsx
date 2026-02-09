import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [sliderIndex, setSliderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSliderIndex((prev) => (prev + 1) % 3);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/home');
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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50">
            {/* Background Blobs */}
            <div className="blob bg-indigo-200 w-[600px] h-[600px] rounded-full -top-[10%] -left-[10%] mix-blend-multiply"></div>
            <div className="blob bg-blue-200 w-[600px] h-[600px] rounded-full -bottom-[10%] -right-[10%] mix-blend-multiply" style={{ animationDelay: '2s' }}></div>

            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl w-full max-w-5xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row overflow-hidden relative z-10 border border-white/60">
                {/* Left Panel */}
                <div className="w-full md:w-1/2 p-10 flex flex-col justify-between bg-slate-100/50 border-r border-slate-200/50" style={{ backgroundColor: '#dbe5e973' }}>
                    {/* Logo */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
                                S
                            </div>
                            <div>
                                <span className="block font-bold text-slate-800 text-lg leading-none">SAVIOR</span>
                                <span className="text-[14px] font-semibold text-cyan-700 tracking-widest uppercase">HRMS Portal</span>
                            </div>
                        </div>

                        <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                            Welcome to your
                            <span className="text-cyan-700"> Digital Workspace.</span><br />
                            <p className="text-slate-500 text-xs font-medium">
                                Manage your work seamlessly with the help of Next Gen Access & Attendance Solutions.
                            </p>
                        </h1>
                    </div>

                    {/* Slider */}
                    <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg border border-white group">
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
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                        <h3 className="text-base font-bold">{slide.title}</h3>
                                        <p className="mt-1 text-xs text-slate-200 leading-snug max-w-md">{slide.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">S</div>
                        <div className="h-8 w-px bg-slate-300"></div>
                        <div className="text-xs text-slate-500">
                            <p className="font-bold text-slate-700 uppercase tracking-wide">STJ Electronics Pvt. Ltd.</p>
                            <p className="mt-0.5 leading-tight">X-51, Okhla Industrial Area,<br />Phase-2, New Delhi - 110 020</p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-full md:w-1/2 p-10 flex flex-col bg-white/60">
                    <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">Sign In</h2>
                            <p className="text-slate-500 text-sm mt-1">Please enter your details to continue.</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Employee ID</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-user text-slate-400"></i>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                        placeholder="e.g. EMP-2024"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fa-solid fa-lock text-slate-400"></i>
                                    </div>
                                    <input
                                        type="password"
                                        className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                                </label>
                                <a href="#" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
                            >
                                Secure Login
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wide">Need Assistance?</p>
                        <div className="flex justify-center items-center gap-4 text-xs text-slate-600">
                            <span className="flex items-center gap-1">
                                <i className="fa-solid fa-phone text-slate-400 text-[10px]"></i>
                                +91-11-4981 6000
                            </span>
                            <span className="text-slate-300">|</span>
                            <a href="mailto:support@saviorstj.com" className="flex items-center gap-1 text-cyan-800 hover:underline">
                                <i className="fa-solid fa-envelope text-[10px]"></i>
                                support@saviorstj.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
