import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen min-h-svh clean-bg transition-colors duration-300">
            {/* Animated Background Blobs - Smaller on mobile */}
            <div className="blob bg-cyan-300 dark:bg-cyan-800 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-full -top-20 -left-20"></div>
            <div className="blob bg-indigo-300 dark:bg-indigo-800 w-[350px] sm:w-[500px] lg:w-[600px] h-[350px] sm:h-[500px] lg:h-[600px] rounded-full top-1/3 -right-40" style={{ animationDelay: '2s' }}></div>
            <div className="blob bg-purple-300 dark:bg-purple-800 w-[250px] sm:w-[300px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[400px] rounded-full bottom-20 left-1/4" style={{ animationDelay: '4s' }}></div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-[1600px] mx-auto relative z-10">
                <Outlet />
            </main>
        </div>
    );
}
